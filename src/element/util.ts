import { base64FromUrl } from '../file';
import { isString } from '../is';
import {pause, cLog} from '../misc';


export function getClosestParentByStyleProperty (el: any, property: any, propertyValue: any)
{
  var rod = el.parentNode;
  
  let it = 0;
  
  while (rod !== document.body)
  {
	  ++it;
	  if (it > 100) {return false;}
	  
    	if (window.getComputedStyle(rod)[property] === propertyValue)
		{
//			cLog('absolute parent found', rod);
			return rod;
		}
      	rod = rod.parentNode;
  }
      
  return false;
}

// https://stackoverflow.com/a/442474/10977967
// @ts-expect-error TS(7006): Parameter 'el' implicitly has an 'any' type.
export function getOffset (el)  // Doesn't work when scrollTop was altered
{
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

// @ts-expect-error TS(7006): Parameter 'urlRel' implicitly has an 'any' type.
export async function predNacistObrazek (urlRel)
{	
	var session = sessionStorage.getItem('predNacistObrazek');				//cLog('session', session, predNacistObrazek);
// @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
	session = JSON.parse(session);											//cLog('session', session, predNacistObrazek);
	if (!session) 
	{
// @ts-expect-error TS(2322): Type '{}' is not assignable to type 'string'.
		session = {};
	} 
	
// @ts-expect-error TS(2531): Object is possibly 'null'.
	if (!session.hasOwnProperty(urlRel)) 
	{
// @ts-expect-error TS(2304): Cannot find name 'konstanty'.
		var imgBase64 = await base64FromUrl(konstanty.URL_SABLONA+urlRel);
		
//		var img = new Image();
//		img.src = imgBase64;
//		document.body.appendChild(img);
		
// @ts-expect-error TS(2531): Object is possibly 'null'.
		session[urlRel] = imgBase64;								//cLog('session - přidat nový obrázek', session, predNacistObrazek);
		
		sessionStorage.setItem('predNacistObrazek', JSON.stringify(session));
	}
}

// @ts-expect-error TS(7006): Parameter 'urlRel' implicitly has an 'any' type.
export function dejPredNactenyObrazek (urlRel)
{	
	var session = sessionStorage.getItem('predNacistObrazek');				//cLog('session', session, predNacistObrazek);
// @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
	session = JSON.parse(session);											//cLog('session', session, predNacistObrazek);
	if (!session) {return;} 
	if (!session.hasOwnProperty(urlRel)) {return;}
	
//	var src = session[urlRel];	cLog('src', src, dejPredNactenyObrazek);
	
	return session[urlRel];
}


//function nahratSkript (src, nonce)
//{
//        var tag = document.createElement('script');
//        tag.setAttribute("src", src);
//        tag.setAttribute("nonce", nonce);
//        document.getElementsByTagName("head")[0].appendChild(tag);
//}
//
//var filesadded = [];	 
//function checkloadjscssfile(filename, nonce){
//    if (filesadded.indexOf(filename)==-1){
//        loadjscssfile(filename, nonce);
//        filesadded.push(filename);
//    }
//}


// @ts-expect-error TS(7006): Parameter 'tag' implicitly has an 'any' type.
export function elCreate(tag, attry = {}, inHTML = '')
{
	var el = document.createElement(tag);
													//cLog('attry', attry, vytvorElem);
// @ts-expect-error TS(2550): Property 'entries' does not exist on type 'ObjectC... Remove this comment to see the full error message
	for (let [nazev, hod] of Object.entries(attry)) 
	{												//cLog('nazev', nazev, vytvorElem); cLog('hod', hod, vytvorElem);
		el.setAttribute(nazev, hod);
	}

	el.innerHTML = inHTML;
	
	return el;
}

// @ts-expect-error TS(7006): Parameter 'obj' implicitly has an 'any' type.
export function lzeProchazetOpakovane(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

// @ts-expect-error TS(7006): Parameter 'el' implicitly has an 'any' type.
export function elPreteka (el, toleranceH = 0) 
{
//	console.log ('elPreteka :: el', el);
//	console.log ('elPreteka :: el.scrollHeight', el.scrollHeight);
//	console.log ('elPreteka :: el.clientHeight', el.clientHeight);
	
	if (el === document.body) 
	{
//		console.log ('elPreteka :: window.innerHeight', window.innerHeight);
		
		return window.innerHeight < el.scrollHeight;
	}
	else
	{
		return (el.scrollHeight > (el.clientHeight + toleranceH) || el.scrollWidth > el.clientWidth);
	}
}

// @ts-expect-error TS(7006): Parameter 'el' implicitly has an 'any' type.
export function reflow (el) {var oh = el.offsetHeight;}

// @ts-expect-error TS(7006): Parameter 'el' implicitly has an 'any' type.
export function poziceEl (el) // pozice v rámci rodiče
{
	var poz = 0;
	while( (el = el.previousSibling) != null ) {poz++;}		
	return poz;
}

// @ts-expect-error TS(7006): Parameter 'rel' implicitly has an 'any' type.
export function odkaz (rel, popis)
{    
    // @ts-expect-error TS(2304): Cannot find name 'home'.
    return '<a href="'+home+rel+'">'+popis+'</a>';
}

// @ts-expect-error TS(7006): Parameter 'html' implicitly has an 'any' type.
export function htmlToElements(html, elementNodesOnly = true) 
{
    var template = document.createElement('template');
    template.innerHTML = html;

	if (elementNodesOnly) {return template.content.children;}
	else 				  {return template.content.childNodes;}
}

/**
 * @param {(string[]|Node[])} elements - HTML string or Nodes
 * @param {(string|Node)} referenceNode
 * @param {bool} after
 */
// @ts-expect-error TS(7006): Parameter 'elements' implicitly has an 'any' type.
export function elemInsert (elements, referenceNode, after = false) 
{
	if (isString(referenceNode)) {referenceNode = document.querySelector (referenceNode);}
	
	if (isString(elements)) 
	{
		elements = htmlToElements(elements, false); 		//cLog('elements', elements, elemInsert);
		
		elements = Array.from(elements);
	}
	
	if ( !lzeProchazetOpakovane(elements) ) {elements = [elements];}
	
	if (after) 	{var placement = referenceNode.nextSibling;}
	else		{var placement = referenceNode;}
	
// @ts-expect-error TS(7006): Parameter 'n' implicitly has an 'any' type.
	elements.forEach( (n) =>
	{
		referenceNode.parentNode.insertBefore(n, placement);
	});
}

// @ts-expect-error TS(7006): Parameter 'node1' implicitly has an 'any' type.
export function zamenitPrvky (node1, node2) 
{
    const afterNode2 = node2.nextElementSibling;
    const parent = node2.parentNode;
    node1.replaceWith(node2);
    parent.insertBefore(node1, afterNode2);
}

// @ts-expect-error TS(7006): Parameter 'prvek' implicitly has an 'any' type.
export function nahraditPrvek (prvek, nahrada)
{										
	if (isString(prvek)) {prvek = document.querySelector (prvek);}
	
	if (isString(nahrada)) 
	{
		// 1. způsob
//		var doc = new DOMParser().parseFromString(nahrada, 'text/html');
//		var noveEl = doc.body;												cLog('noveEl', noveEl);
//		prvek.replaceWith(noveEl);
		// 2. způsob
//		var wrapper = document.createElement('div');
//		wrapper.innerHTML = '<div>'+nahrada+'</div>';			cLog('wrapper', wrapper);
//		var noveEl = wrapper.firstChild;					cLog('noveEl', noveEl);
//		prvek.replaceWith(noveEl);

		// 3. způsob
		prvek.insertAdjacentHTML('beforebegin', nahrada);
	}
	else
	{
// @ts-expect-error TS(2304): Cannot find name 'insertBefore'.
		insertBefore(nahrada, prvek.parentNode);
	}
	
	prvek.remove();
}

// Pokud nebude fungovat, použít awaitScroll ze Scrollbar.js
// @ts-expect-error TS(7006): Parameter 'elem' implicitly has an 'any' type.
export function awaitScroll (elem, targetPosition, behavior) 
{																	
//	cLog('targetPosition', targetPosition, awaitScroll);
  	targetPosition = Math.round(targetPosition); //sometimes the value is a float which stops the Promise from resolving 
 	if (targetPosition < 0) {targetPosition = 0;}
	// cLog('targetPosition - floored', targetPosition, awaitScroll);

	elem.scrollTo({
    		top: targetPosition,
    		behavior: behavior
  		});

	return new Promise( (resolve, reject) => 
	{
// @ts-expect-error TS(7034): Variable 'timeoutId' implicitly has type 'any' in ... Remove this comment to see the full error message
		let timeoutId;
		
	    const failed = setTimeout(() => 
	    {
			cLog('awaitScroll reached limit -> reject');
	    	reject();
	    }, 4000);
		
		const finished = () => 
		{
//			cLog('awaitScroll :: finished');
    		elem.removeEventListener("scroll", scrollHandler);
	      	clearTimeout(failed);
// @ts-expect-error TS(7005): Variable 'timeoutId' implicitly has an 'any' type.
	      	clearTimeout(timeoutId);
// @ts-expect-error TS(2794): Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
	      	resolve();
  		};
		
	    const scrollHandler = () => 
	    {
// @ts-expect-error TS(7005): Variable 'timeoutId' implicitly has an 'any' type.
			clearTimeout(timeoutId);
				
//			cLog('elem.scrollTop', elem.scrollTop, awaitScroll);	
			
		    if (elem.scrollTop === targetPosition) 
		    {										
			    finished();
		    }
		    else // 100ms have elapsed since the last scroll event
		    {
			    timeoutId = setTimeout(finished, 100);
		    }
	    };
	    
//	    cLog('elem.scrollTop', elem.scrollTop, awaitScroll);
	    
	    if (elem.scrollTop === targetPosition  ||  !elPreteka(elem)) 	{finished();}
	    else 															{elem.addEventListener('scroll', scrollHandler);}
	});
}

// @ts-expect-error TS(7006): Parameter 'el' implicitly has an 'any' type.
export function rozmerySkryteho (el, rod)
{												//console.log(rod);		
//	var cln_doc = el.cloneNode(true);
	var cln_rod = el.cloneNode(true);
	
//	var detiVyska = 0;
//	[...el.children].forEach ((d)=>
//	{					
//		var cs = window.getComputedStyle(d);
//		var marginTop = parseInt(cs.getPropertyValue('margin-top').replace('px', '')); 	//console.log('margin-top: '+marginTop);
//		var marginBottom = parseInt(cs.getPropertyValue('margin-bottom').replace('px', '')); 	//console.log('margin-bottom: '+marginBottom);
//		
//		detiVyska += marginTop + marginBottom;
//	});
//	console.log('detiVyska: '+detiVyska);
	
//	var cs = window.getComputedStyle(el.parentNode);
//	var paddingLeft = parseInt(cs.getPropertyValue('padding-left').replace('px', '')); 	//console.log('margin-top: '+marginTop);
//	var paddingRight = parseInt(cs.getPropertyValue('padding-right').replace('px', '')); 	//console.log('margin-bottom: '+marginBottom);	
//	var paddingSirka = paddingLeft + paddingRight;
	
//	cln.classList.remove('none');	//alert('rozmerySkryteho - remove none');

//	var par = el.parentNode;
//	var cs = window.getComputedStyle(par);
//	var parWidth = cs.getPropertyValue('width');  console.log('parWidth - width:' + parWidth);
 	
//	cln_doc.style.position = 'absolute';
//	cln_doc.style.visibility = 'hidden';
	cln_rod.hidden = false;
	cln_rod.style.position = 'absolute';
	cln_rod.style.visibility = 'hidden';

//	cln_doc.style.maxHeight = '999999px';
//	cln_doc.style.maxWidth = '999999px'; //parWidth;
	cln_rod.style.maxHeight = '999999px';
	cln_rod.style.maxWidth = '999999px'; //parWidth;

//	cln_doc.style.height = 'auto';
//	cln_doc.style.width = 'auto';
	cln_rod.style.height = 'auto';
	cln_rod.style.width = 'auto';


//	await pause(2000);
//	document.body.appendChild(cln_doc);				//alert('appendChild');
//	await pause(20);
//	var vyska_doc = cln_doc.scrollHeight;   	//console.log('vyska - doc:' + vyska_doc);		//+ detiVyska
//	var sirka_doc = cln_doc.scrollWidth;		//console.log('sirka - doc:' + sirka_doc);
//	await pause(20);
//	cln_doc.remove();
	
	rod.appendChild(cln_rod);				//alert('appendChild');
//	await pause(20);
	var vyska_rod = cln_rod.scrollHeight;   	//console.log('vyska - rod:' + vyska_rod);		//+ detiVyska
	var sirka_rod = cln_rod.scrollWidth;		//console.log('sirka - rod:' + sirka_rod);
	cln_rod.remove();

//parNode.style.height = '';	//alert('cln.style.maxHeight:' + cln.style.maxHeight);
//	parNode.style.width = '';
//	rod.style.height = '';	//alert('cln.style.maxHeight:' + cln.style.maxHeight);
//	rod.style.width = '';

//var vyska,sirka;
//	if (vyska_doc > vyska_rod) {vyska = vyska_doc;} else {vyska = vyska_rod;}
//	if (sirka_doc < sirka_rod) {sirka = sirka_doc;} else {sirka = sirka_rod;}
	
//	return {vyska: vyska, sirka: sirka};
	return {vyska: vyska_rod, sirka: sirka_rod};
}

// @ts-expect-error TS(7006): Parameter 'element' implicitly has an 'any' type.
export function isElement(element) 
{
    return element instanceof Element || element instanceof HTMLDocument;  
}

// @ts-expect-error TS(7006): Parameter 'el' implicitly has an 'any' type.
export function isVisible (el, fully = false) //, posun = 0		// alternativou je IntersectionObserver
{
	var rect = el.getBoundingClientRect(), 
		top = rect.top, 
//		height = rect.height,
		bottom = rect.bottom;
	var bottomInt = Math.floor(bottom);	// porovnat s přesností na celé pixely
	
	//cLog ('el top', top, isVisible);	
	//cLog ('bottom', bottom, isVisible);
    
    if (fully)
	{
		if (top < 0  ||  bottom > window.innerHeight) 
		{
//			cLog ('není zcela na stránce', el, isVisible); 
			return false;
		}
	}
	else
	{
		// Je mimo stránku (nahoře)
		if (bottom < 0) 
		{
//			cLog ('Je mimo stránku (nahoře)', bottom, isVisible);
			return false;}
		// Je mimo stránku (dole)
		if (top > document.documentElement.clientHeight) 
		{
//			cLog ('Je mimo stránku (dole)', top, isVisible);
			return false;}
	}
	  
	// projít všechny rodiče
	var rod = el.parentNode;
	var rectRod;
	  
	do 
	{	//cLog ('rod', rod, isVisible); 
		if (!rod) {return false;}	
		rectRod = rod.getBoundingClientRect();
		
		
		let rodComputedStyle = window.getComputedStyle(rod);		
		var parentCssOverflow = rodComputedStyle.getPropertyValue('overflow');	//cLog ('cssOverflow', cssOverflow, isVisible);	
		var parentCssVisibility = rodComputedStyle.getPropertyValue('visibility');
		if (parentCssVisibility === 'hidden') {return false;}		
		var parentNoOverflow = parentCssOverflow === 'scroll' || parentCssOverflow === 'hidden' || parentCssOverflow === 'clip';
//		var cssOverflowX = rodComputedStyle.getPropertyValue('overflow-x');	cLog ('cssOverflowX', cssOverflowX, isVisible);	
		
		
		if (fully && parentNoOverflow)
		{
//			cLog ('rectRod.top', rectRod.top, jeVidet);	cLog ('rectRod.bottom', rectRod.bottom, jeVidet);
			
			var rectRodBottomInt = Math.floor(rectRod.bottom);
			
			if (top < rectRod.top  ||  bottomInt > rectRodBottomInt) 
			{
//				cLog ('není zcela (rodič)', el, jeVidet); 
				return false;}
		}
		else if (parentNoOverflow)
		{
			if (top <= rectRod.bottom === false) 
			{
//				cLog ('rod', rod, isVisible); 
//				cLog ('top <= rectRod.bottom', rectRod.bottom, isVisible);
				return false;
			}
		
			// Check if the element is out of view due to a container scrolling
			if (bottom <= rectRod.top) 
			{
//				cLog ('bottom <= rectRod.top', rectRod.top, isVisible);
				return false;
			}
		}
		
		rod = rod.parentNode;
	} 
	while (rod != document.body)
	
	return true
}

// @ts-expect-error TS(7006): Parameter 'prvky' implicitly has an 'any' type.
export function cssSelektorPrvky (prvky)
{
	if ( !lzeProchazetOpakovane(prvky) ) {prvky = [prvky];}		//cLog('prvky', prvky, cssSelektorPrvky);
	
	var obj = [];	
	var str = '';	
	
	for (let [i, el] of prvky.entries())
	{										//cLog('el', el, cssSelektorPrvky);
		var selEl = cssSelektorPrvek (el);
		obj.push(selEl.obj);
		
		var odd = i === 0 ? '' : ', ';
		
		str += odd+selEl.str;	//cLog('str', str, cssSelektorPrvky);
	}
	
//	cLog('obj', obj, cssSelektorPrvky);
//	cLog('str', str, cssSelektorPrvky);
	
	return {obj: obj, str: str};
}

// @ts-expect-error TS(7006): Parameter 'el' implicitly has an 'any' type.
export function cssSelektorPrvek (el)
{										//cLog('el', el, cssSelektorPrvek);	cLog('el.dataset', el.dataset, cssSelektorPrvek);
	var obj = {atry: {}};									
	var str = '';		
	
	// data atributy
	var dataAttrs = Object.keys(el.dataset);
	if (dataAttrs.length > 0) 
	{
		for (let attr of dataAttrs)
		{
			if (attr === 'polozekNaStranku' || attr === 'nahrajDalsiPoradi' || attr === 'stranka') {continue;}
			
			let dataAttr_dashed = attr.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
	
			var dataAttrHod = el.dataset[attr]; 
			
// @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
			obj.atry['data-'+dataAttr_dashed] = dataAttrHod;
						
			str += '[data-'+dataAttr_dashed+'="'+dataAttrHod+'"]';
		}
	}
	
	return {obj: obj, str: str};
}

