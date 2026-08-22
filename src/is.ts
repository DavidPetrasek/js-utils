// 1. Runtime Deprecation Warning
if (typeof console !== 'undefined' && console.warn) {
  console.warn(
    '[@dpsys/js-utils] WARNING: The "@dpsys/js-utils/is" entry point is deprecated and will be removed in v3.0.0. ' +
    'Please import these functions from their new specific subpaths (e.g., "@dpsys/js-utils/str", "@dpsys/js-utils/misc").'
  );
}

// Import the actual implementations internally
import { 
  isStrictMode as _isStrictMode, 
  isEmpty as _isEmpty, 
  isArrayStringEmpty as _isArrayStringEmpty, 
  isObjectEmpty as _isObjectEmpty, 
  isIterable as _isIterable,
  isTouchDevice as _isTouchDevice 
} from './misc';
import { isString as _isString } from './string';

// Re-export individually with dedicated JSDoc tags
/** @deprecated Will move to "@dpsys/js-utils/misc" in v3.0.0 */
export const isStrictMode = _isStrictMode;

/** @deprecated Will move to "@dpsys/js-utils/misc" in v3.0.0 */
export const isEmpty = _isEmpty;

/** @deprecated Will move to "@dpsys/js-utils/misc" in v3.0.0 */
export const isArrayStringEmpty = _isArrayStringEmpty;

/** @deprecated Will move to "@dpsys/js-utils/misc" in v3.0.0 */
export const isObjectEmpty = _isObjectEmpty;

/** @deprecated Will move to "@dpsys/js-utils/misc" in v3.0.0 */
export const isIterable = _isIterable;

/** @deprecated Will move to "@dpsys/js-utils/misc" in v3.0.0 */
export const isTouchDevice = _isTouchDevice;

/** @deprecated Will move to "@dpsys/js-utils/str" in v3.0.0 */
export const isString = _isString;