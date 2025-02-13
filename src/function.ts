
export function debounce(callback: any, wait: number) 
{
	let timeout : number;

	return (...args : unknown[]) => 
	{
		clearTimeout(timeout);
		timeout = setTimeout(function (this : unknown) { callback.apply(this, args); }, wait);
	};
}