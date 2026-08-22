import { getFontSize as _getFontSize } from "./element/util";

/** @deprecated Will move to "@dpsys/js-utils/el" in v3.0.0 */
export const getFontSize = _getFontSize;

export function emToPx(ems: number): number { return ems * getFontSize(document.body); }
export function pxToEm(px: number): number { return px / getFontSize(document.body); }

export function remToPx(rems: number): number { return rems * getFontSize(document.documentElement); }
export function pxToRem(px: number): number { return px / getFontSize(document.documentElement); }

function formatLogMessage(description: string, fn?: Function): string 
{
    return fn?.name ? `${fn.name} :: ${description}` : description;
}

export function cLog(valueDescription: string, value?: unknown, fn?: Function): void 
{
    const message = formatLogMessage(valueDescription, fn);
    
    if (value !== undefined) 
    {
        console.log(message, value);
    } 
    else 
    {
        console.log(message);
    }
}

export function cErr(valueDescription: string, value?: unknown, fn?: Function): void 
{
    const message = formatLogMessage(valueDescription, fn);
    
    if (value !== undefined) 
    {
        console.error(message, value);
    } 
    else 
    {
        console.error(message);
    }
}

/**
 * @deprecated Asynchronous signature returning Promise<void> will become synchronous (returning void) in v3.0.0
 */
export async function redirect(url : string = '', afterMs : number = 0) : Promise<void>
{
    setTimeout(() => 
    {
        if (url === '') {location.reload();}
	    else			{location.href = url;}
    }, afterMs);
}


export function pause(ms : number) : Promise<void> { return new Promise(res => setTimeout(res, ms)); }

export function getTimestamp(format : 'seconds'|'milliseconds' = 'seconds') : number
{
	if (format === 'seconds')
	{
		return Math.floor(Date.now() / 1000);
	}
	else if (format === 'milliseconds')
	{
		return Date.now();	
	}

	return 0;
}

export function isTouchDevice() : boolean
{
	return window.matchMedia("(pointer: coarse)").matches;
}

export function isStrictMode() : boolean
{
	return (function(this: unknown) { return !this; })();
}

export function isEmpty(val : unknown[]|string|object) : boolean
{
    if (Array.isArray(val))      { return isArrayStringEmpty(val); }
    if (val instanceof Object)   { return isObjectEmpty(val); }
    return isArrayStringEmpty(val);
}

export function isArrayStringEmpty(arr : unknown[]|string) : boolean
{
	return arr.length === 0;
}

export function isObjectEmpty(obj : object) : boolean
{
	return obj
		&& Object.keys(obj).length === 0
		&& Object.getPrototypeOf(obj) === Object.prototype;
}

export function isIterable(val : unknown) : boolean
{
  return Symbol.iterator in Object(val);
}