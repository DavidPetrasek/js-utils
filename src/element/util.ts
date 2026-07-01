import { isString } from '../string';
import { isIterable } from '../misc';


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

/**
 * Gets the computed CSS property value of the given element.
 */
export function getCssStyle(el: HTMLElement, prop: string) : string
{
    return window.getComputedStyle(el, null).getPropertyValue(prop);
}

/**
 * Gets the CSS font descriptor (e.g. "bold 14px verdana") of the given element.
 */
export function getCssFont(el: HTMLElement = document.body): string
{
  const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
  const fontSize = getCssStyle(el, 'font-size') || '16px';
  const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';
  
  return `${fontWeight} ${fontSize} ${fontFamily}`;
}

export function getPositionAmongSiblings(el : HTMLElement) : number
{
	var pos : number = 0;
	while( (el = el.previousSibling as HTMLElement) != null ) {pos++;}		
	return pos;
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

export function isOverflown(el : HTMLElement, heightTolerance : number = 0, widthTolerance : number = 0) : boolean
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

export function isScrollableY(el : HTMLElement) : boolean
{
    const overflowYStyle = window.getComputedStyle(el).overflowY;
    const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1;

    return el.scrollHeight > el.clientHeight && !isOverflowHidden;
}

export function isScrollableX(el : HTMLElement) : boolean
{
    const overflowXStyle = window.getComputedStyle(el).overflowX;
    const isOverflowHidden = overflowXStyle.indexOf('hidden') !== -1;

    return el.scrollWidth > el.clientWidth && !isOverflowHidden;
}

export function isScrollableXY(el : HTMLElement) : boolean
{
    return isScrollableY(el) && isScrollableX(el);
}

export function htmlToElements(html : string, elNodesOnly : boolean = true) : HTMLCollection|NodeList
{
    var template = document.createElement('template');
    template.innerHTML = html;

	if (elNodesOnly) {return template.content.children;}
	else 		     {return template.content.childNodes;}
}

/**
 * @param nodes - HTML strings or node/s
 * @param referenceEl - querySelector or HTML element
 */
export function insertNodes (nodes : string|Node[]|Node, referenceEl : HTMLElement|string, after : boolean = false) : void
{
    let refEl : HTMLElement|null = null;
    if (isString(referenceEl)) {
        refEl = document.querySelector(referenceEl as string);
    } else {
        refEl = referenceEl as HTMLElement;
    }
    
    if (!refEl) return;
    const parent = refEl.parentNode; // Capture parent context early
    if (!parent) return;             // Safe breakout if element is unmounted

    let nodesArr : Node[] = [];
    if (isString(nodes)) 
    {
        let elemsNodeList : NodeList = htmlToElements(nodes as string, false) as NodeList;		
        nodesArr = Array.from(elemsNodeList);
    }
    else if (!isIterable(nodes)) { nodesArr = [nodes as Node]; }
    
    // Keep track of target placement without losing the parent context
    let targetAnchor: Node|null = refEl;
    if (after) 
    {
        targetAnchor = refEl.nextSibling; // If null, insertBefore safely appends to the end
    }
    
    nodesArr.forEach((n : Node) =>
    {
        parent.insertBefore(n, targetAnchor);
    });
}

export function switchElements(el1 : HTMLElement, el2 : HTMLElement) : void
{
    const afterNode2 = el2.nextElementSibling;
    const parent = el2.parentNode;
    el1.replaceWith(el2);
    parent?.insertBefore(el1, afterNode2);
}

export function getFontSize(el: HTMLElement): number 
{
    const style = window.getComputedStyle(el, null).getPropertyValue('font-size');
    return parseFloat(style);
}