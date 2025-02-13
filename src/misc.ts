

export function emToPx (ems : number) : number
{
	var bodyStyle = window.getComputedStyle(document.body, null).getPropertyValue('font-size');
	var bodyFontSize = parseFloat(bodyStyle);
		
	return ems * bodyFontSize;
}

export function pxToEm (px : number) : number
{
	var bodyStyle = window.getComputedStyle(document.body, null).getPropertyValue('font-size');
	var bodyFontSize = parseFloat(bodyStyle);
		
	return px / bodyFontSize;
}

export function cLog (valueDescription : string, value : unknown = null, fn : any = null) : void
{
	if (fn !== null) {valueDescription = fn.name+' :: '+valueDescription;}
	
	console.log (valueDescription, value);
}

export function cErr(valueDescription : string, value : unknown = null, fn : any = null) : void
{
	if (fn !== null) {valueDescription = fn.name+' :: '+valueDescription;}
	
	console.error(valueDescription, value);
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
	if (format === 'milliseconds')
	{
		return Date.now();	
	}

	return 0;
}


