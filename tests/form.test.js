// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setDisabledStateChildInputs, getFileNames } from '../src/element/form.ts';

describe('Form Utilities', () => {
    describe('setDisabledStateChildInputs', () => {
        let parent;

        beforeEach(() => {
            parent = document.createElement('div');
        });

        it('should modify dataset properties if target elements contain data-disabled descriptors', () => {
            const mockInput = document.createElement('input');
            mockInput.dataset.disabled = 'false';
            parent.appendChild(mockInput);

            // Toggle true
            setDisabledStateChildInputs(parent, true);
            expect(mockInput.dataset.disabled).toBe('true');

            // Toggle false
            setDisabledStateChildInputs(parent, false);
            expect(mockInput.dataset.disabled).toBe('false');
        });

        it('should append or drop the standard disabled element attributes otherwise', () => {
            const mockSelect = document.createElement('select');
            const mockTextarea = document.createElement('textarea');
            parent.appendChild(mockSelect);
            parent.appendChild(mockTextarea);

            // Toggle true
            setDisabledStateChildInputs(parent, true);
            expect(mockSelect.hasAttribute('disabled')).toBe(true);
            expect(mockTextarea.hasAttribute('disabled')).toBe(true);

            // Toggle false
            setDisabledStateChildInputs(parent, false);
            expect(mockSelect.hasAttribute('disabled')).toBe(false);
            expect(mockTextarea.hasAttribute('disabled')).toBe(false);
        });
    });

    describe('getFileNames', () => {
        it('should return an empty array if no files property is found on input element', () => {
            const inputEl = document.createElement('input');
            inputEl.type = 'file';
            
            expect(getFileNames(inputEl)).toEqual([]);
        });

        it('should extract filenames while stripping out legacy path prefixes', () => {
            const inputEl = document.createElement('input');
            inputEl.type = 'file';

            // Mock a typical browser FileList instance structure safely
            const mockFiles = {
                0: { name: 'C:\\fakepath\\document.pdf' },
                1: { name: 'image.png' },
                length: 2,
                item: function(index) { return this[index]; }
            };

            Object.defineProperty(inputEl, 'files', {
                value: mockFiles,
                writable: true
            });

            const names = getFileNames(inputEl);
            expect(names).toEqual(['document.pdf', 'image.png']);
        });
    });
});