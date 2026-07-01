// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { stringTruncate, stringToBool, stringWidth, isString } from '../src/string.ts';

describe('String Utilities', () => {
  
  describe('stringTruncate', () => {
    it('should return the original string if it is shorter than the specified length', () => {
      expect(stringTruncate('hello', 10)).toBe('hello');
    });

    it('should return the original string if its length equals the specified length', () => {
      expect(stringTruncate('hello', 5)).toBe('hello');
    });

    it('should truncate and add default ellipsis ("...") when exceeding length', () => {
      expect(stringTruncate('hello world', 5)).toBe('hello...');
    });

    it('should accept and append a custom ellipsis string', () => {
      expect(stringTruncate('hello world', 5, '---')).toBe('hello---');
    });
  });

  describe('stringToBool', () => {
    it('should return true for truthy string values regardless of casing and whitespace', () => {
      expect(stringToBool('true')).toBe(true);
      expect(stringToBool('  TRUE  ')).toBe(true);
      expect(stringToBool('yes')).toBe(true);
      expect(stringToBool('YES')).toBe(true);
      expect(stringToBool('1')).toBe(true);
    });

    it('should return false for falsy string values regardless of casing and whitespace', () => {
      expect(stringToBool('false')).toBe(false);
      expect(stringToBool('  FALSE  ')).toBe(false);
      expect(stringToBool('no')).toBe(false);
      expect(stringToBool('0')).toBe(false);
    });

    it('should return false when passing null or undefined-like inputs safely', () => {
      // The optional chaining safely routes these through the switch block
      expect(stringToBool(null)).toBe(false);
      expect(stringToBool(undefined)).toBe(false);
    });

    it('should fall back to JSON.parse for valid JSON strings', () => {
      expect(stringToBool('[]')).toEqual([]);
      expect(stringToBool('{"status": 200}')).toEqual({ status: 200 });
    });

    it('should throw a SyntaxError if fallback string is not valid JSON', () => {
      expect(() => stringToBool('not-json')).toThrow(SyntaxError);
    });
  });

  describe('stringWidth', () => {
    beforeAll(() => {
      // Intercept canvas generation to mock text-metric measurements inside JSDOM environment
      vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
        if (tagName === 'canvas') {
          return {
            getContext: () => ({
              font: '',
              measureText: (text) => ({
                // Simulate calculations: 10px per character multiplier
                width: text.length * 10 
              })
            })
          };
        }
        return document.createElement(tagName);
      });
    });

    it('should calculate and return string width based on layout context calculations', () => {
      const width = stringWidth('hello', 'bold 14px verdana');
      expect(width).toBe(50); // 5 characters * 10
    });
  });

  describe('isString', () => {
    it('should return true for literal primitive strings', () => {
      expect(isString('hello')).toBe(true);
      expect(isString('')).toBe(true);
    });

    it('should return true for explicitly instantiated String objects', () => {
      expect(isString(new String('hello'))).toBe(true);
    });

    it('should return false for any non-string data types', () => {
      expect(isString(123)).toBe(false);
      expect(isString(true)).toBe(false);
      expect(isString({})).toBe(false);
      expect(isString([])).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
    });
  });

});