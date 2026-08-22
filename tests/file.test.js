// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { print, blobToBase64, downloadStream, base64ToArrayBuffer, fileExists } from '../src/file.ts';

describe('File Utilities', () => {
    beforeEach(() => {
        vi.stubGlobal('URL', {
            createObjectURL: vi.fn(() => 'blob:mock-url'),
            revokeObjectURL: vi.fn()
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    describe('base64ToArrayBuffer', () => {
        it('should accurately convert a base64 encoded string into a Uint8Array', () => {
            // "SGVsbG8=" is base64 for "Hello"
            const result = base64ToArrayBuffer('SGVsbG8=');
            expect(result).toBeInstanceOf(Uint8Array);
            expect(result.length).toBe(5);
            expect(String.fromCharCode(...result)).toBe('Hello');
        });
    });

    describe('blobToBase64', () => {
        it('should parse a Blob into a base64 data URL string via FileReader', async () => {
            const sampleBlob = new Blob(['sample text'], { type: 'text/plain' });
            const base64Str = await blobToBase64(sampleBlob);
            
            expect(base64Str).toContain('data:text/plain;base64,');
        });
    });

    describe('fileExists', () => {
        it('should return true if a HEAD request resolves with an ok status', async () => {
            const fetchSpy = vi.fn().mockResolvedValue({ ok: true });
            vi.stubGlobal('fetch', fetchSpy);

            const status = await fileExists('https://example.com/asset.png');
            expect(status).toBe(true);
            expect(fetchSpy).toHaveBeenCalledWith('https://example.com/asset.png', { method: 'HEAD' });
        });

        it('should return false if a HEAD request resolves with a broken status code', async () => {
            vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
            
            const status = await fileExists('https://example.com/missing.png');
            expect(status).toBe(false);
        });
    });

    describe('print', () => {
        it('should orchestrate document printing via iframe hooks and auto clean object URLs', async () => {
            const appendSpy = vi.spyOn(document.body, 'appendChild');
            
            // Minimal iframe mock structure to verify behavior pipelines safely
            const mockIframe = document.createElement('iframe');
            const mockPrint = vi.fn();
            Object.defineProperty(mockIframe, 'contentWindow', {
                value: { print: mockPrint },
                writable: true
            });

            vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
                if (tagName === 'iframe') return mockIframe;
                return document.createElement(tagName);
            });

            print('content-payload', 'blob', 'application/pdf');

            expect(window.URL.createObjectURL).toHaveBeenCalled();
            expect(appendSpy).toHaveBeenCalledWith(mockIframe);

            // Fire onload callback hook manually to trigger inner printing pipelines
            mockIframe.onload();

            // Check that inner window routine executes
            expect(mockPrint).toHaveBeenCalled();
            
            // Yield macro-tasks so the window URL revocation completes
            await vi.waitFor(() => {
                expect(window.URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
            });
        });
    });

    describe('downloadStream', () => 
    {
        beforeEach(() => 
        {
            vi.useFakeTimers();
        });

        afterEach(() => 
        {
            vi.useRealTimers();
        });

        it('should generate a hidden link element, populate target filename, trigger download action, and clean up', async () => 
        {
            const appendSpy = vi.spyOn(document.body, 'appendChild');
            const removeSpy = vi.spyOn(document.body, 'removeChild');
            
            const mockLink = document.createElement('a');
            const clickSpy = vi.spyOn(mockLink, 'click').mockImplementation(() => {});
            
            vi.spyOn(document, 'createElement').mockImplementation((tagName) => 
            {
                if (tagName === 'a') return mockLink;
                return document.createElement(tagName);
            });

            const headers = new Headers({
                'content-disposition': 'attachment; filename="report_2026.csv"',
                'content-type': 'text/csv'
            });

            downloadStream('csv,data,payload', headers);

            // Move all timers (e.g. setTimeout for revokeObjectURL)
            vi.runAllTimers();

            expect(mockLink.download).toBe('report_2026.csv');
            expect(mockLink.href).toBe('blob:mock-url');
            expect(appendSpy).toHaveBeenCalledWith(mockLink);
            expect(clickSpy).toHaveBeenCalled();
            expect(removeSpy).toHaveBeenCalledWith(mockLink);
            expect(window.URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
        });
    });
});