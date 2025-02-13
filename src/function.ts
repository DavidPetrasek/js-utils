
export function debounce(callback: any, delayMs: number) 
{
	let timeout : number;

	return (...args : unknown[]) => 
	{
		clearTimeout(timeout);
		timeout = setTimeout(function (this : unknown) { callback.apply(this, args); }, delayMs);
	};
}