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
/** @deprecated Move to "@dpsys/js-utils/misc" */
export const isStrictMode = _isStrictMode;

/** @deprecated Move to "@dpsys/js-utils/misc" */
export const isEmpty = _isEmpty;

/** @deprecated Move to "@dpsys/js-utils/misc" */
export const isArrayStringEmpty = _isArrayStringEmpty;

/** @deprecated Move to "@dpsys/js-utils/misc" */
export const isObjectEmpty = _isObjectEmpty;

/** @deprecated Move to "@dpsys/js-utils/misc" */
export const isIterable = _isIterable;

/** @deprecated Move to "@dpsys/js-utils/misc" */
export const isTouchDevice = _isTouchDevice;

/** @deprecated Move to "@dpsys/js-utils/str" */
export const isString = _isString;