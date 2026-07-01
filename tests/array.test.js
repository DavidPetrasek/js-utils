import { describe, it, expect } from 'vitest';
import { arrayMoveItem } from '../src/array.ts';

describe('Array Utilities', () => {
    describe('arrayMoveItem', () => {
        it('should move an item from a lower index to a higher index', () => {
            const input = ['a', 'b', 'c', 'd'];
            const result = arrayMoveItem(input, 1, 2); // Move 'b' to index 2

            expect(result).toEqual(['a', 'c', 'b', 'd']);
        });

        it('should move an item from a higher index to a lower index', () => {
            const input = ['a', 'b', 'c', 'd'];
            const result = arrayMoveItem(input, 3, 0); // Move 'd' to index 0

            expect(result).toEqual(['d', 'a', 'b', 'c']);
        });

        it('should mutate the original array directly in place', () => {
            const input = [1, 2, 3];
            const result = arrayMoveItem(input, 0, 2);

            expect(result).toBe(input); // Check reference equality
            expect(input).toEqual([2, 3, 1]);
        });
    });
});