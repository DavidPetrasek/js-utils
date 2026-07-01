// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce, domReady } from '../src/callback.ts';

describe('Callback Utilities', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    describe('debounce', () => {
        it('should delay function execution until after the specified timeout window', () => {
            const callback = vi.fn();
            const debouncedFn = debounce(callback, 200);

            debouncedFn('test');
            expect(callback).not.toHaveBeenCalled();

            vi.advanceTimersByTime(200);
            expect(callback).toHaveBeenCalledWith('test');
        });

        it('should execute only once when invoked multiple times in rapid succession', () => {
            const callback = vi.fn();
            const debouncedFn = debounce(callback, 200);

            debouncedFn(1);
            debouncedFn(2);
            debouncedFn(3);

            vi.advanceTimersByTime(199);
            expect(callback).not.toHaveBeenCalled();

            vi.advanceTimersByTime(1);
            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith(3); // Should execute with the last arguments passed
        });
    });

    describe('domReady', () => {
        afterEach(() => {
            vi.restoreAllMocks();
        });

        it('should execute immediately if document.readyState is already loaded', () => {
            vi.spyOn(document, 'readyState', 'get').mockReturnValue('interactive');
            const callback = vi.fn();

            domReady(callback);
            expect(callback).toHaveBeenCalled();
        });

        it('should add a DOMContentLoaded listener if document.readyState is loading', () => {
            vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading');
            const addListenerSpy = vi.spyOn(document, 'addEventListener');
            const callback = vi.fn();

            domReady(callback);
            
            expect(callback).not.toHaveBeenCalled();
            expect(addListenerSpy).toHaveBeenCalledWith('DOMContentLoaded', callback);
        });
    });
});