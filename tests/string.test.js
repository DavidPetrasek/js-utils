import { expect, test } from 'vitest';
import { stringTruncate } from "../src/string";


test('default', () => 
{
    expect(stringTruncate('wafawfawfawawfawffwaf_:.úawúk', 8)).toBeTypeOf('string');
});