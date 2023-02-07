import {pauza, cas, cLog, isString, base64FromUrl} from '/p-system/jadro/moduly/js/fce.js';
import * as konstanty from '/p-system/jadro/moduly/js/start/konstanty.js';


export async function predNacistObrazek (urlRel)
{	
	var session = sessionStorage.getItem('predNacistObrazek');				//cLog('session', session, predNacistObrazek);
	session = JSON.parse(session);											//cLog('session', session, predNacistObrazek);
	if (!session) 
	{
		session = {};
	} 
	
	if (!session.hasOwnProperty(urlRel)) 
	{
		var imgBase64 = await base64FromUrl(konstanty.URL_SABLONA+urlRel);
		
//		var img = new Image();
//		img.src = imgBase64;
//		document.body.appendChild(img);
		
		session[urlRel] = imgBase64;								//cLog('session - přidat nový obrázek', session, predNacistObrazek);
		
		sessionStorage.setItem('predNacistObrazek', JSON.stringify(session));
	}
}

export function dejPredNactenyObrazek (urlRel)
{	
	var session = sessionStorage.getItem('predNacistObrazek');				//cLog('session', session, predNacistObrazek);
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


export function vytvorElem (tag, attry, inHTML = '')
{
	var el = document.createElement(tag);
													//cLog('attry', attry, vytvorElem);
	for (let [nazev, hod] of Object.entries(attry)) 
	{												//cLog('nazev', nazev, vytvorElem); cLog('hod', hod, vytvorElem);
		el.setAttribute(nazev, hod);
	}

	el.innerHTML = inHTML;
	
	return el;
}

export function lzeProchazetOpakovane(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

export function elPreteka (el, toleranceH = 0) 
{
//	console.log ('elPreteka :: el', el);
//	console.log ('elPreteka :: el.scrollHeight', el.scrollHeight);
//	console.log ('elPreteka :: el.clientHeight', el.clientHeight);
	return (el.scrollHeight > (el.clientHeight + toleranceH) || el.scrollWidth > el.clientWidth);
}

export function reflow (el) {var oh = el.offsetHeight;}

export function poziceEl (el) // pozice v rámci rodiče
{
	var poz = 0;
	while( (el = el.previousSibling) != null ) {poz++;}		
	return poz;
}

export function form_pridatData (form, data) 
{
    if (typeof form === 'string') 
    {
        form = document.querySelector(form);
	}

	Object.entries(data).forEach(entry => 
	{
  		const [key, value] = entry;
  		
		var inp = vytvorElem ('input', '', '', '', '', [], key, 'hidden', value);		

        form.appendChild(inp);
    });
}

export function odkaz (rel, popis)
{    
    return '<a href="'+home+rel+'">'+popis+'</a>';
}

export function htmlToElements(html) 
{
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

/**
 * @param {(string[]|Node[])} elements - HTML string or Nodes
 * @param {(string|Node)} referenceNode
 * @param {bool} after
 */
export function elemInsert (elements, referenceNode, after = false) 
{
	if (isString(referenceNode)) {referenceNode = document.querySelector (referenceNode);}
	
	if (isString(elements)) 
	{
		elements = htmlToElements(elements); 		//cLog('elements', elements, elemInsert);
		
		elements = Array.from(elements);
	}
	
	if ( !lzeProchazetOpakovane(elements) ) {elements = [elements];}
	
	elements = elements.reverse();
	
	if (after) 	{var placement = referenceNode.nextSibling;}
	else		{var placement = referenceNode;}
	
	elements.forEach( (n) =>
	{
		referenceNode.parentNode.insertBefore(n, placement);
	});
}

export function zamenitPrvky (node1, node2) 
{
    const afterNode2 = node2.nextElementSibling;
    const parent = node2.parentNode;
    node1.replaceWith(node2);
    parent.insertBefore(node1, afterNode2);
}

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
		insertBefore(nahrada, prvek.parentNode);
	}
	
	prvek.remove();
}

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


//	await pauza(2000);
//	document.body.appendChild(cln_doc);				//alert('appendChild');
//	await pauza(20);
//	var vyska_doc = cln_doc.scrollHeight;   	//console.log('vyska - doc:' + vyska_doc);		//+ detiVyska
//	var sirka_doc = cln_doc.scrollWidth;		//console.log('sirka - doc:' + sirka_doc);
//	await pauza(20);
//	cln_doc.remove();
	
	rod.appendChild(cln_rod);				//alert('appendChild');
//	await pauza(20);
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

export function jeVidet (el, zcela = false, posun = 0)
{
	var rect = el.getBoundingClientRect(), 
		top = rect.top, 
		height = rect.height,
		bottom = rect.bottom;
	var bottomInt = Math.floor(bottom);	// porovnat s přesností na celé pixely
	
//	cLog ('top', top, jeVidet);	cLog ('bottom', bottom, jeVidet);
    
    if (zcela)
	{
		if (top < 0  ||  bottom > window.innerHeight) 
		{
//			cLog ('není zcela na stránce', el, jeVidet); 
			return false;}
	}
	else
	{
		// Je mimo stránku (nahoře)
		if (bottom < 0) {return false;}
		// Je mimo stránku (dole)
		if (top > document.documentElement.clientHeight) {return false;}
	}
	  
	// projít všechny rodiče
	var rod = el.parentNode;
	var rectRod;
	  
	do {
		rectRod = rod.getBoundingClientRect();
		
		if (zcela)
		{
//			cLog ('rectRod.top', rectRod.top, jeVidet);	cLog ('rectRod.bottom', rectRod.bottom, jeVidet);
			
			var rectRodBottomInt = Math.floor(rectRod.bottom);
			
			if (top < rectRod.top  ||  bottomInt > rectRodBottomInt) 
			{
//				cLog ('není zcela (rodič)', el, jeVidet); 
				return false;}
		}
		else
		{
			if (top <= rectRod.bottom === false) {return false;}
		
			// Check if the element is out of view due to a container scrolling
			if (bottom <= rectRod.top) {return false;}
		}
		
		rod = rod.parentNode;
	} 
	while (rod != document.body)
	
	return true
		
//    var rect = el.getBoundingClientRect();		//cLog ('rect.top', rect.top, jeCastecneVidet);	cLog ('window.scrollY', window.scrollY, jeVidet);
//    var odShora = rect.top;						//cLog ('odShora', odShora, jeVidet);
//    var odSpoda = rect.bottom;					//cLog ('odSpoda', odSpoda, jeVidet);
//    
//    var rod_rect = rod.getBoundingClientRect();		//cLog ('rect.top', rect.top, jeVidet);	cLog ('window.scrollY', window.scrollY, jeVidet);
//    var rod_odShora = rod_rect.top;						//cLog ('rod_odShora', rod_odShora, jeVidet);
//    var rod_odSpoda = rod_rect.bottom;						//cLog ('rod_odSpoda', rod_odSpoda, jeVidet);
//
//	var dolniOkrajJeVidet = odSpoda > rod_odShora; 		cLog ('dolniOkrajJeVidet', dolniOkrajJeVidet, jeVidet);
//	var horniOkrajJeVidet = odShora < rod_odSpoda; 		cLog ('horniOkrajJeVidet', horniOkrajJeVidet, jeVidet);
//
//    return (odSpoda > rod_odShora  ||  odShora < rod_odSpoda);
    
    // WINDOW
//    var rect = el.getBoundingClientRect();
//
//    return (rect.top-posun < window.innerHeight && rect.bottom+posun >= 0);
}

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
			
			obj.atry['data-'+dataAttr_dashed] = dataAttrHod;
						
			str += '[data-'+dataAttr_dashed+'="'+dataAttrHod+'"]';
		}
	}
	
	return {obj: obj, str: str};
}

