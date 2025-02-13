import { isIterable, isString } from '../is';


/**
 * https://stackoverflow.com/a/442474/10977967 
 * Doesn't work when scrollTop was altered 
 */
export function getOffset (el : HTMLElement) : {top: number, left: number}
{
    var _x : number = 0;
    var _y : number = 0;

    while( !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) 
	{
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        
		let el_ = el.offsetParent;
		if (!el_) {break;} else {el = el_ as HTMLElement;}
    }

    return {top: _y, left: _x};
}

export function elCreate(tagName : string, attrs : object = {}, innerHTML : string = '') : HTMLElement
{
	var el = document.createElement(tagName);

	for (let [name, value] of Object.entries(attrs)) 
	{
		el.setAttribute(name, value);
	}

	el.innerHTML = innerHTML;
	
	return el;
}

export function isOverflown (el : HTMLElement, heightTolerance : number = 0, widthTolerance : number = 0) : boolean
{	
	if (el === document.body)
	{
		return window.innerHeight < el.scrollHeight;
	}
	else
	{
		return (el.scrollHeight > (el.clientHeight + heightTolerance) || el.scrollWidth > (el.clientWidth + widthTolerance));
	}
}

export function getPositionAmongSiblings (element : HTMLElement) : number
{
	var pos : number = 0;
	while( (element = element.previousSibling as HTMLElement) != null ) {pos++;}		
	return pos;
}

export function htmlToElements(html : string, elementNodesOnly : boolean = true) : HTMLCollection|NodeList
{
    var template = document.createElement('template');
    template.innerHTML = html;

	if (elementNodesOnly) {return template.content.children;}
	else 				  {return template.content.childNodes;}
}

/**
 * @param nodes - HTML strings or node/s
 * @param referenceElement - querySelector or HTML element
 */
export function insertNodes (nodes : string|Node[]|Node, referenceElement : HTMLElement|string, after : boolean = false) : void
{
	let refEl : HTMLElement|null =  null;
	if (isString(referenceElement)) {refEl = document.querySelector(referenceElement as string);}
	
	let nodesArr : Node[] = [];
	if (isString(nodes)) 
	{
		let elemsNodeList : NodeList = htmlToElements(nodes as string, false) as NodeList;		
		nodesArr = Array.from(elemsNodeList);
	}
	else if ( !isIterable(nodes) ) {nodesArr = [nodes as Node];}
	
	if (after) 	{refEl = refEl?.nextSibling as HTMLElement;}
	
	nodesArr.forEach( (n : Node) =>
	{
		refEl?.parentNode?.insertBefore(n, refEl);
	});
}

export function switchElements (element1 : HTMLElement, element2 : HTMLElement) : void
{
    const afterNode2 = element2.nextElementSibling;
    const parent = element2.parentNode;
    element1.replaceWith(element2);
    parent?.insertBefore(element1, afterNode2);
}

