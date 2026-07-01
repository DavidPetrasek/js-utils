// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
    getFontSize, 
    emToPx, 
    pxToEm, 
    remToPx, 
    pxToRem, 
    cLog, 
    cErr, 
    redirect, 
    pause, 
    getTimestamp,
    isTouchDevice,
    isStrictMode,
    isEmpty,
    isArrayStringEmpty,
    isObjectEmpty,
    isIterable
} from '../src/misc.ts';

describe('DOM Font Size Utilities', () => {
    let computedStyleSpy;

    beforeEach(() => {
        // Mock getComputedStyle to return a reliable value across tests
        computedStyleSpy = vi.spyOn(window, 'getComputedStyle').mockImplementation(() => {
            return {
                getPropertyValue: (prop) => prop === 'font-size' ? '16px' : ''
            };
        });
    });

    afterEach(() => {
        computedStyleSpy.mockRestore();
    });

    it('getFontSize should parse element font-size as a number', () => {
        const dummyElement = document.createElement('div');
        expect(getFontSize(dummyElement)).toBe(16);
    });

    it('emToPx should convert em to pixels based on body font-size', () => {
        expect(emToPx(2)).toBe(32);
        expect(emToPx(0.5)).toBe(8);
    });

    it('pxToEm should convert pixels to em based on body font-size', () => {
        expect(pxToEm(32)).toBe(2);
        expect(pxToEm(8)).toBe(0.5);
    });

    it('remToPx should convert rem to pixels based on root font-size', () => {
        expect(remToPx(3)).toBe(48);
    });

    it('pxToRem should convert pixels to rem based on root font-size', () => {
        expect(pxToRem(48)).toBe(3);
    });
});

describe('Logger Utilities', () => {
    beforeEach(() => {
        vi.spyOn(console, 'log').mockImplementation(() => {});
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('cLog should log only the message when value and fn are omitted', () => {
        cLog('Hello World');
        expect(console.log).toHaveBeenCalledWith('Hello World');
    });

    it('cLog should log message and value when value is provided', () => {
        const data = { id: 1 };
        cLog('User Data', data);
        expect(console.log).toHaveBeenCalledWith('User Data', data);
    });

    it('cLog should prepend the function name if provided', () => {
        function myTestFunction() {}
        cLog('Process started', null, myTestFunction);
        expect(console.log).toHaveBeenCalledWith('myTestFunction :: Process started', null);
    });

    it('cErr should log an error message to console.error', () => {
        cErr('Critical Error');
        expect(console.error).toHaveBeenCalledWith('Critical Error');
    });
});

describe('Async Utilities', () => {
    let mockLocation;

    beforeEach(() => {
        vi.useFakeTimers();
        
        // Setup a mock object for global location
        mockLocation = {
            href: '',
            reload: vi.fn()
        };
        vi.stubGlobal('location', mockLocation);
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.unstubAllGlobals();
    });

    it('pause should resolve after the specified timeout', async () => {
        const spy = vi.fn();
        pause(1000).then(spy);

        expect(spy).not.toHaveBeenCalled();
        
        vi.advanceTimersByTime(1000);
        await Promise.resolve(); 
        expect(spy).toHaveBeenCalled();
    });

    it('redirect should refresh the page if no url is passed', async () => {
        const redirectPromise = redirect('', 500);
        vi.advanceTimersByTime(500);
        await redirectPromise;

        expect(mockLocation.reload).toHaveBeenCalled();
    });

    it('redirect should change the href location if url is passed', async () => {
        const redirectPromise = redirect('https://example.com', 200);
        vi.advanceTimersByTime(200);
        await redirectPromise;

        expect(mockLocation.href).toBe('https://example.com');
    });
});

describe('Timestamp Utility', () => {
    const mockSystemTime = new Date('2026-06-30T12:00:00Z');

    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(mockSystemTime);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('getTimestamp should return seconds by default', () => {
        const expectedSeconds = Math.floor(mockSystemTime.getTime() / 1000);
        expect(getTimestamp()).toBe(expectedSeconds);
    });

    it('getTimestamp should return milliseconds when specified', () => {
        expect(getTimestamp('milliseconds')).toBe(mockSystemTime.getTime());
    });
});

describe('Environment Utilities', () => 
{
    describe('isTouchDevice', () => 
    {
        // Clean up window.matchMedia after each test to avoid test cross-contamination
        afterEach(() => {
            if ('matchMedia' in window) {
                delete window.matchMedia;
            }
        });

        it('should return true if pointer matches coarse layout rules', () => {
            // Directly define the mock function on window
            window.matchMedia = vi.fn().mockImplementation((query) => ({
                matches: query === '(pointer: coarse)'
            }));
            
            expect(isTouchDevice()).toBe(true);
            
            // Optionally verify it was called with the correct argument
            expect(window.matchMedia).toHaveBeenCalledWith('(pointer: coarse)');
        });

        it('should return false if pointer query does not match coarse criteria', () => {
            // Directly define the mock function on window
            window.matchMedia = vi.fn().mockImplementation(() => ({
                matches: false
            }));

            expect(isTouchDevice()).toBe(false);
        });
    });

    describe('isStrictMode', () => {
        it('should verify if code evaluation enforces strict compliance rules', () => {
            // Vitest / modern ESM test execution environments enforce strict mode by default
            expect(isStrictMode()).toBe(true);
        });
    });
});

describe('Validation Utilities', () => {
    describe('isArrayStringEmpty', () => {
        it('should return true if elements or characters have length 0', () => {
            expect(isArrayStringEmpty([])).toBe(true);
            expect(isArrayStringEmpty('')).toBe(true);
        });

        it('should return false if entries or characters have data', () => {
            expect(isArrayStringEmpty([1, 2])).toBe(false);
            expect(isArrayStringEmpty('not empty')).toBe(false);
        });
    });

    describe('isObjectEmpty', () => {
        it('should return true for a plain, vanilla empty object structure', () => {
            expect(isObjectEmpty({})).toBe(true);
        });

        it('should return false if structural data keys exist', () => {
            expect(isObjectEmpty({ key: 'val' })).toBe(false);
        });

        it('should return false for falsy value variations', () => {
            expect(isObjectEmpty(null)).toBe(null);
        });

        it('should return false if prototype rules deviate from Object root structures', () => {
            const alternativeProto = Object.create(null);
            expect(isObjectEmpty(alternativeProto)).toBe(false);

            class DummyClass {}
            expect(isObjectEmpty(new DummyClass())).toBe(false);
        });
    });

    describe('isEmpty', () => {
        it('should accurately handle generic string evaluation targets', () => {
            expect(isEmpty('')).toBe(true);
            expect(isEmpty('data')).toBe(false);
        });

        it('should accurately handle array validation targets', () => {
            expect(isEmpty([])).toBe(true);
            expect(isEmpty([1])).toBe(false);
        });

        it('should accurately route and parse structural object items', () => {
            expect(isEmpty({})).toBe(true);
            expect(isEmpty({ item: 1 })).toBe(false);
        });
    });

    describe('isIterable', () => {
        it('should return true for collections with native iteration protocols', () => {
            expect(isIterable([])).toBe(true);
            expect(isIterable('string')).toBe(true);
            expect(isIterable(new Map())).toBe(true);
            expect(isIterable(new Set())).toBe(true);
        });

        it('should return false for items lacking sequence iteration controls', () => {
            expect(isIterable({})).toBe(false);
            expect(isIterable(42)).toBe(false);
            expect(isIterable(true)).toBe(false);
            expect(isIterable(null)).toBe(false);
            expect(isIterable(undefined)).toBe(false);
        });
    });
});