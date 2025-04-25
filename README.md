
# Javascript Utilities

[![ISC License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)

Handy functions for JS development.

Supports CJS, ESM and TypeScript.

## Installation

```bash
npm i @dpsys/js-utils 
```

## Example Usage
```js
import { cLog } from '@dpsys/js-utils/misc';

let myVar = 'Hello World';
cLog('myVar', myVar);
```

## List of Functions

### Array
- `arrayMoveItem(arr, fromIndex, toIndex)`: Moves an item within an array from one index to another, returning the modified array.

### File
- `blobToBase64(blob)`: Converts a Blob/File to base64 string
- `downloadStream(data, headers)`: Downloads data stream with proper filename from content-disposition
- `print(data, dataType, mimeType)`: Invokes system print dialog ready to print provided data (base64 or blob)
- `fileExists(url)`: Checks if file exists at given URL

### Function
- `debounce(callback, delayMs)`: Delay function execution

### Is
- `isStrictMode()`: Detects if code is running in strict mode
- `isEmpty(val)`: Checks if array/string/object is empty
- `isArrayStringEmpty(arr)`: Checks if array or string is empty
- `isObjectEmpty(obj)`: Checks if object is empty
- `isIterable(val)`: Checks if variable is iterable
- `isString(val)`: Checks if variable is string
- `isTouchDevice()`: Detects if device has touch capabilities

### Misc
- `emToPx(ems)`: Converts em units to pixels
- `pxToEm(px)`: Converts pixels to em units
- `cLog(valueDescription, value, fn)`: Enhanced console.log with function name support
- `cErr(valueDescription, value, fn)`: Enhanced console.error with function name support
- `redirect(url, afterMs)`: Redirects to URL after specified milliseconds
- `pause(ms)`: Creates a promise that resolves after specified milliseconds
- `getTimestamp(format)`: Gets current timestamp in seconds or milliseconds

### String
- `stringTruncate(str, length, ellipsis)`: Truncates string to specified length with ellipsis
- `stringToBool(str)`: Converts string to boolean

### Form
- `setDisabledStateChildInputs(parent, state)`: Sets disabled state for all form inputs within parent element
- `getFileNames(fileInp)`: Gets array of file names from file input element

### Element
- `getOffset(el)`: Gets element's offset relative to document
- `elCreate(tagName, attrs, innerHTML)`: Creates HTML element with attributes and inner HTML
- `isOverflown(el, heightTolerance, widthTolerance)`: Checks if element content is overflowing
- `isScrollableX(el)`: Checks if element is scrollable horizontally
- `isScrollableY(el)`: Checks if element is scrollable vertically
- `isScrollableXY(el)`: Checks if element is scrollable horizontally and vertically
- `getPositionAmongSiblings(element)`: Gets element's position among its siblings
- `htmlToElements(html, elementNodesOnly)`: Converts HTML string to elements/nodes
- `insertNodes(nodes, referenceElement, after)`: Inserts nodes (or nodes created from provided string) before/after the reference element
- `switchElements(element1, element2)`: Swaps positions of two DOM elements
