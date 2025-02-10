export function isStrictMode ()
{
// @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
	var strict = (function() { return !this; })();

	if (strict) {console.log ( "strict mode enabled, strict is " + strict );} 
	else 		{console.log ( "strict mode not defined, strict is " + strict );}
}

// @ts-expect-error TS(7006): Parameter 'val' implicitly has an 'any' type.
export function isEmpty (val)
{
	return isArrayStringEmpty(val) || isObjectEmpty (val);
}

// @ts-expect-error TS(7006): Parameter 'arr' implicitly has an 'any' type.
export function isArrayStringEmpty (arr)
{
	return arr.length === 0;
}

// @ts-expect-error TS(7006): Parameter 'obj' implicitly has an 'any' type.
export function isObjectEmpty (obj)
{
	return obj
		&& Object.keys(obj).length === 0
		&& Object.getPrototypeOf(obj) === Object.prototype;
}

// @ts-expect-error TS(7006): Parameter 'el' implicitly has an 'any' type.
export function isIterable (el)
{
  return Symbol.iterator in Object(el);
}

// @ts-expect-error TS(7006): Parameter 'myVar' implicitly has an 'any' type.
export function isString (myVar)
{
  return (typeof myVar === 'string' || myVar instanceof String);
}

export function isTouchDevice ()
{
	return window.matchMedia("(pointer: coarse)").matches;
}