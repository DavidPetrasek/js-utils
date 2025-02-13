export function isStrictMode () : boolean
{
	return (function(this: unknown) { return !this; })();
}

export function isEmpty (val : []|string|object) : boolean
{
	if (val instanceof Object) 	{return isObjectEmpty(val);}
	else 						{return isArrayStringEmpty(val);}
}

export function isArrayStringEmpty (arr : []|string) : boolean
{
	return arr.length === 0;
}

export function isObjectEmpty (obj : object) : boolean
{
	return obj
		&& Object.keys(obj).length === 0
		&& Object.getPrototypeOf(obj) === Object.prototype;
}

export function isIterable (el : unknown) : boolean
{
  return Symbol.iterator in Object(el);
}

export function isString (myVar : unknown) : boolean
{
  return (typeof myVar === 'string' || myVar instanceof String);
}

export function isTouchDevice () : boolean
{
	return window.matchMedia("(pointer: coarse)").matches;
}