

export function getFontSize(element: HTMLElement): number 
{
    const style = window.getComputedStyle(element, null).getPropertyValue('font-size');
    return parseFloat(style);
}

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

export async function redirect (url : string = '', afterMs : number = 0) : Promise<void>
{														
	await pause(afterMs);
	
	if (url === '') {location.reload();}
	else			{location.href = url;}
}


export function pause (ms : number) : Promise<void> { return new Promise(res => setTimeout(res, ms)); }

export function getTimestamp (format : 'seconds'|'milliseconds' = 'seconds') : number
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