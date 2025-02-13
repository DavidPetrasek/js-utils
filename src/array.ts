

export function arrayMoveItem (arr: unknown[], fromIndex: number, toIndex: number) : unknown[]
{
	let itemRemoved = arr.splice(fromIndex, 1); // assign the removed item as an array
	arr.splice(toIndex, 0, itemRemoved[0]); // insert itemRemoved into the target index
	return arr;
}