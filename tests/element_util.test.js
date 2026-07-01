// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
    getOffset,
    getCssStyle,
    getCssFont,
    getPositionAmongSiblings,
    elCreate,
    isOverflown,
    isScrollableY,
    isScrollableX,
    isScrollableXY,
    htmlToElements,
    insertNodes,
    switchElements,
    getFontSize
} from '../src/element/util.ts';

// Mock implementations for the `is` entry points imported internally by util.ts
vi.mock('../is', () => ({
    isString: (val) => typeof val === 'string' || val instanceof String,
    isIterable: (val) => val !== null && typeof val === 'object' && Symbol.iterator in val
}));

describe('DOM Element Utilities', () => {

    describe('getOffset', () => {
        it('should compute exact coordinates accumulating parental elements across trees', () => {
            const parent = document.createElement('div');
            const child = document.createElement('div');

            // jsdom does not draw graphics structures. Hard mock explicit layout calculations:
            Object.defineProperties(child, {
                offsetLeft: { value: 30 },
                offsetTop: { value: 40 },
                scrollLeft: { value: 10 },
                scrollTop: { value: 5 },
                offsetParent: { value: parent }
            });

            Object.defineProperties(parent, {
                offsetLeft: { value: 100 },
                offsetTop: { value: 200 },
                scrollLeft: { value: 0 },
                scrollTop: { value: 0 },
                offsetParent: { value: null }
            });

            const coords = getOffset(child);
            // x = (30 - 10) + (100 - 0) = 120
            // y = (40 - 5) + (200 - 0) = 235
            expect(coords).toEqual({ left: 120, top: 235 });
        });

        it('should return zero combinations if non-measurable items are evaluated', () => {
            const hiddenEl = document.createElement('div');
            Object.defineProperties(hiddenEl, {
                offsetLeft: { value: NaN },
                offsetTop: { value: NaN }
            });
            expect(getOffset(hiddenEl)).toEqual({ left: 0, top: 0 });
        });
    });

    describe('getCssStyle', () => {
        it('should retrieve a computed style target macro', () => {
            const el = document.createElement('div');
            const styleSpy = vi.spyOn(window, 'getComputedStyle').mockImplementation(() => ({
                getPropertyValue: (prop) => prop === 'color' ? 'rgb(0, 0, 0)' : ''
            }));

            expect(getCssStyle(el, 'color')).toBe('rgb(0, 0, 0)');
            styleSpy.mockRestore();
        });
    });

    describe('getCssFont', () => {
        it('should bundle design specifications together perfectly', () => {
            const el = document.createElement('div');
            const styleSpy = vi.spyOn(window, 'getComputedStyle').mockImplementation(() => ({
                getPropertyValue: (prop) => {
                    if (prop === 'font-weight') return 'bold';
                    if (prop === 'font-size') return '14px';
                    if (prop === 'font-family') return 'sans-serif';
                    return '';
                }
            }));

            expect(getCssFont(el)).toBe('bold 14px sans-serif');
            styleSpy.mockRestore();
        });

        it('should fallback securely to defaults if element specs are empty', () => {
            const styleSpy = vi.spyOn(window, 'getComputedStyle').mockImplementation(() => ({
                getPropertyValue: () => ''
            }));

            expect(getCssFont(document.body)).toBe('normal 16px Times New Roman');
            styleSpy.mockRestore();
        });
    });

    describe('getPositionAmongSiblings', () => {
        it('should correctly capture index positions relative to immediate siblings', () => {
            const container = document.createElement('div');
            const item0 = document.createElement('span');
            const item1 = document.createElement('span');
            const item2 = document.createElement('span');

            container.appendChild(item0);
            container.appendChild(item1);
            container.appendChild(item2);

            expect(getPositionAmongSiblings(item0)).toBe(0);
            expect(getPositionAmongSiblings(item1)).toBe(1);
            expect(getPositionAmongSiblings(item2)).toBe(2);
        });
    });

    describe('elCreate', () => {
        it('should map layout configurations, custom attributes, and raw strings smoothly', () => {
            const attributes = { class: 'btn primary', 'disabled': 'true' };
            const inlineMarkup = '<b>Save</b>';
            const element = elCreate('button', attributes, inlineMarkup);

            expect(element.tagName).toBe('BUTTON');
            expect(element.getAttribute('class')).toBe('btn primary');
            expect(element.getAttribute('disabled')).toBe('true');
            expect(element.innerHTML).toBe('<b>Save</b>');
        });
    });

    describe('isOverflown', () => {
        afterEach(() => {
            vi.unstubAllGlobals();
        });

        it('should validate boundaries uniquely for the document root body context', () => {
            Object.defineProperty(document.body, 'scrollHeight', { value: 1000, configurable: true });
            vi.stubGlobal('innerHeight', 600);
            expect(isOverflown(document.body)).toBe(true);

            vi.stubGlobal('innerHeight', 1200);
            expect(isOverflown(document.body)).toBe(false);
        });

        it('should incorporate optional pixel tolerance parameters when evaluating normal divs', () => {
            const el = document.createElement('div');
            Object.defineProperties(el, {
                scrollHeight: { value: 250, configurable: true },
                clientHeight: { value: 200, configurable: true },
                scrollWidth: { value: 100, configurable: true },
                clientWidth: { value: 100, configurable: true }
            });

            expect(isOverflown(el)).toBe(true);
            // 200 clientHeight + 60 heightTolerance = 260, which is > 250 scrollHeight
            expect(isOverflown(el, 60, 0)).toBe(false);
        });
    });

    describe('Scrollability Filters', () => {
        let styleSpy;
        let el;

        beforeEach(() => {
            el = document.createElement('div');
        });

        afterEach(() => {
            if (styleSpy) styleSpy.mockRestore();
        });

        it('isScrollableY should assert true if vertical layout scales spill over visibly', () => {
            Object.defineProperties(el, {
                scrollHeight: { value: 500, configurable: true },
                clientHeight: { value: 300, configurable: true }
            });
            styleSpy = vi.spyOn(window, 'getComputedStyle').mockImplementation(() => ({ overflowY: 'auto' }));
            expect(isScrollableY(el)).toBe(true);
        });

        it('isScrollableY should assert false if layout styling masks active overflows', () => {
            Object.defineProperties(el, {
                scrollHeight: { value: 500, configurable: true },
                clientHeight: { value: 300, configurable: true }
            });
            styleSpy = vi.spyOn(window, 'getComputedStyle').mockImplementation(() => ({ overflowY: 'hidden' }));
            expect(isScrollableY(el)).toBe(false);
        });

        it('isScrollableX should track layout alignments horizontally', () => {
            Object.defineProperties(el, {
                scrollWidth: { value: 400, configurable: true },
                clientWidth: { value: 200, configurable: true }
            });
            styleSpy = vi.spyOn(window, 'getComputedStyle').mockImplementation(() => ({ overflowX: 'scroll' }));
            expect(isScrollableX(el)).toBe(true);
        });

        it('isScrollableXY should evaluate comprehensive grid axes layouts together', () => {
            Object.defineProperties(el, {
                scrollHeight: { value: 300, configurable: true },
                clientHeight: { value: 150, configurable: true },
                scrollWidth: { value: 300, configurable: true },
                clientWidth: { value: 150, configurable: true }
            });
            styleSpy = vi.spyOn(window, 'getComputedStyle').mockImplementation(() => ({
                overflowX: 'auto',
                overflowY: 'scroll'
            }));
            expect(isScrollableXY(el)).toBe(true);
        });
    });

    describe('htmlToElements', () => {
        const structuralMarkup = '<div>One</div><span>Two</span>Text node';

        it('should separate element children exclusively when elNodesOnly is toggled true', () => {
            const result = htmlToElements(structuralMarkup, true);
            expect(result.length).toBe(2);
            expect(result[0].tagName).toBe('DIV');
            expect(result[1].tagName).toBe('SPAN');
        });

        it('should yield structural fragment comments and nodes if filtration checks are skipped', () => {
            const result = htmlToElements(structuralMarkup, false);
            expect(result.length).toBe(3); // Div + Comment Node + Span
        });
    });

    describe('insertNodes', () => {
        let parent, ref;

        beforeEach(() => {
            parent = document.createElement('div');
            ref = document.createElement('div');
            ref.id = 'anchor';
            parent.appendChild(ref);
            document.body.appendChild(parent);
        });

        afterEach(() => {
            document.body.innerHTML = '';
        });

        it('should transform raw textual snippets and position them adjacent to selection anchors', () => {
            vi.spyOn(document, 'querySelector').mockImplementation(() => ref);
            insertNodes('<p id="inserted-txt"></p>', '#anchor', false);
            expect(ref.previousSibling.id).toBe('inserted-txt');
        });

        it('should handle single isolated native node instances securely', () => 
        {
            // Create a parent container to host the elements
            const container = document.createElement('div');
            
            const ref = document.createElement('div');
            ref.id = 'target-node';
            container.appendChild(ref); // Mount it so it has a parentNode

            const freshItem = document.createElement('div');
            freshItem.id = 'fresh-node';

            insertNodes(freshItem, ref, true);

            expect(ref.nextSibling).not.toBeNull();
            expect(ref.nextSibling.id).toBe('fresh-node');
        });
    });

    describe('switchElements', () => {
        it('should rearrange structural nodes interactively inside an identical container', () => {
            const parent = document.createElement('div');
            const first = document.createElement('h1');
            const second = document.createElement('p');

            parent.appendChild(first);
            parent.appendChild(second);

            switchElements(first, second);

            expect(parent.children[0]).toBe(second);
            expect(parent.children[1]).toBe(first);
        });
    });

    describe('getFontSize', () => {
        it('should isolate floating measurement values from layout rules', () => {
            const target = document.createElement('span');
            const styleSpy = vi.spyOn(window, 'getComputedStyle').mockImplementation(() => ({
                getPropertyValue: (prop) => prop === 'font-size' ? '12.5px' : ''
            }));

            expect(getFontSize(target)).toBe(12.5);
            styleSpy.mockRestore();
        });
    });
});