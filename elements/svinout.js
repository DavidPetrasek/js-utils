import {pauza, cas, cLog, isString} from '../fce.js';
import {vstupyVypZap} from './form/fce.js';


async function collapseSection(el, styleProp) 
{									//console.log('\ncollapseSection'); console.log(el);
	var timer = null;
	var colSection = true;
	
	el.addEventListener('transitionstart', zacitZavreni, { once: true }); // zastavit setInterval (timer), jakmile začne přechod (transition)
	function zacitZavreni()
	{								if (typeof colSection === 'undefined') {return;}
//  		console.log('\nzacitZavreni');
  		ukoncit();
	}
//	el.addEventListener('transitionend', ukoncitZavreni); // zastavit setInterval (timer), jakmile začne přechod (transition)
//	function ukoncitZavreni()
//	{								if (typeof colSection === 'undefined') {return;}
//  		console.log('\nukoncitZavreni');
//  		el.setAttribute('data-srolovano', 'true');
//  		el.removeEventListener('transitionend', ukoncitZavreni);
//	}
	
	const ukoncit = () =>
	{						//console.log('ukoncit');
		clearInterval(timer);
  		el.setAttribute('data-srolovano', 'true');
	}
	
	// attribut style nesmí být prázdný (style="") -> se musí nastavit hodnota, ze které se provede přechod (transition)
	if (styleProp === 'height') {var rozmer = el.scrollHeight;}
	else if (styleProp === 'width') {var rozmer = el.scrollWidth;}
	el.style.setProperty([styleProp], rozmer + 'px');
	// počkat na nastavení hodnoty ve style=""
	setTimeout( ()=>  
	{
		var it = 0;
		timer = setInterval(()=>
		{									//console.log('setInterval');
			if (it > 250) {ukoncit();} //console.log('zaseklo se (collapseSection)');
			el.style[styleProp] = 0 + 'px';
			++it;
	    }, 3);
    }, 40);
}

function expandSection(el, rod, smery) 
{													//console.log('\nexpandSection - smery: ' + smery );
	var rozmerySkryteho_ = rozmerySkryteho (el, rod);
	
	if (smery.includes('H')) 
	{
		el.style.height = rozmerySkryteho_.vyska + 'px'; //console.log('\nrozmerSkryteho: ' + rozmerSkryteho );
	}
	if (smery.includes('W')) 
	{
		el.style.width = rozmerySkryteho_.sirka + 'px';
	}
	  
	el.setAttribute('data-srolovano', 'false');
	
	el.addEventListener('transitionend', dokoncitOtevreni, { once: true }); 
	function dokoncitOtevreni()
	{								//console.log('dokoncitOtevreni');
//		var rozmer = parseInt(el.style[styleProp].replace('px', ''));
		if (rozmerySkryteho_.vyska > 0  &&  rozmerySkryteho_.sirka > 0)
		{									 //console.log('\nrozmer: ' + rozmer );
			expandSection_korekce (el, rod, rozmerySkryteho_, smery); 
		}
	}
	
	// aby se po načtení stránky dokončilo (neproběhne transitionend)
	setTimeout( ()=>  
	{							//console.log('neproběhlo transitionend --> dokončuji');
		if (smery.includes('H')) 
		{
			el.style.height = ''; //console.log('\nrozmerSkryteho: ' + rozmerSkryteho );
		}
		if (smery.includes('W')) 
		{
			el.style.width = '';
		}
    }, 2000);
}

function expandSection_korekce (el, rod, rozmerySkryteho_, smery) 
{
	var cln = el.cloneNode(true);
	cln.style.maxHeight = '999999px';
	cln.style.maxWidth = '999999px';
	
//	cln.style.display = 'block';
	cln.style.position = 'absolute';
	cln.style.visibility = 'hidden';

cln.style.height = 'auto';
cln.style.width = 'auto';

	document.body.appendChild(cln);				//alert('appendChild');
	
	
	var cln_r = el.cloneNode(true);
	cln_r.style.maxHeight = '999999px';
	cln_r.style.maxWidth = '999999px';
	
//	cln.style.display = 'block';
	cln_r.style.position = 'absolute';
	cln_r.style.visibility = 'hidden';

cln_r.style.height = 'auto';
cln_r.style.width = 'auto';

	rod.appendChild(cln_r);		
	
	var vyska,sirka;
	if (cln.clientHeight > cln_r.clientHeight) {vyska = cln.clientHeight;} else {vyska = cln_r.clientHeight;}
	if (cln.clientWidth > cln_r.clientWidth) {sirka = cln.clientWidth;} else {sirka = cln_r.clientWidth;}
	
//	console.log('expandSection_korekce' + el );
	
//	setTimeout( ()=>  
//	{	
		if (smery.includes('H')) 
			{
				el.style.height = vyska + 'px'; //console.log('\nel.style.height: ' + el.style.height );
				
				if (rozmerySkryteho_.vyska === vyska) {el.style.height = '';}   // dokončit, pokud se nic neliší
				else 									{el.style.height = vyska + 'px';}
			}
			if (smery.includes('W')) 
			{
				if (rozmerySkryteho_.sirka === sirka) {el.style.width = '';}
				else 									{el.style.width = sirka + 'px';}
			}
		//console.log('\nrozmerKonec: ' + rozmerKonec );
//	}, 1000);


//	if ( Math.abs(rozmerSkryteho-rozmerKonec) < 50 ) 
//	{
		el.addEventListener('transitionend', dokoncitOtevreni_); 
		function dokoncitOtevreni_()
		{												//console.log('\nexpandSection_korekce - dokoncitOtevreni_'); //console.log('\nrozmer: ' + rozmer );
//			console.log('vyska: ' + vyska);
//			console.log('sirka: ' + sirka);
			
			if (vyska > 0  ||  sirka > 0)
			{
				el.removeEventListener('transitionend', dokoncitOtevreni_); 				
				
//				if (smery.includes('H')) 
//				{
					el.style.height = ''; //console.log('dokončení - el.style.height: ' + el.style.height );
//				}
//				if (smery.includes('W')) 
//				{
					el.style.width = '';
//				}
			}
		}
			
			cln.remove();
			cln_r.remove();
//	}
//	else
//	{
//		el.style[styleProp] = ''; //console.log('\nexpandSection_korekce - velikost je stejná' );
//	}
}	


export function skryjUkaz (roztahnout, el, rod, smer = {H: true, W: true}, max = true, kompenzace = {H: 0, W: 0}) //rod = null
{														//console.log(rod);
	var rozmerySkryteho_ = rozmerySkryteho(el, rod);
	
	if (max) 	{var propStrH = 'maxHeight'; var propStrW = 'maxWidth';}
	else		{var propStrH = 'height'; var propStrW = 'width';}
	
	if (smer.H) {skryjUkaz_ (roztahnout, el, rozmerySkryteho_.vyska, propStrH, kompenzace.H);}	
	if (smer.W)	{skryjUkaz_ (roztahnout, el, rozmerySkryteho_.sirka, propStrW, kompenzace.W);}
}

function skryjUkaz_ (roztahnout, el, rozmerySkryteho, maxProp, kompenzace)
{
	var podminka;
	if 		(roztahnout === 'auto') {podminka = el.style[maxProp] === '0px' || el.style[maxProp] === '';}
	else if (roztahnout === true) 	{podminka = true;}
	else if (roztahnout === false)	{podminka = false;}		//console.log('vyska - podminka: '+podminka);
	
	if 	 (podminka) {el.style[maxProp] = rozmerySkryteho + kompenzace + 'px';}
	else 		    {el.style[maxProp] = '0px';}
}

export function rozvinoutSvinout_priprav ()
{															
	document.querySelectorAll('[data-rozvinout-svinout-spousteci-prvek]').forEach( (el) => 
	{														
		var rozvinoutSvinout = new RozvinoutSvinout(el);
	});
}

export class RozvinoutSvinout
{									
	constructor (el)
	{		
		this.spousteciPrvek = el;
		this.nazev = this.spousteciPrvek.dataset.rozvinoutSvinoutSpousteciPrvek;					//cLog('this.nazev', this.nazev);
		this.cilovePrvky = document.querySelectorAll('[data-rozvinout-svinout-cilovy-prvek="'+this.nazev+'"]');
		
		var handler_rozvinoutSvinout = this.rozvinoutSvinout.bind(this);
		this.spousteciPrvek.addEventListener('click', handler_rozvinoutSvinout);
//		var svinoutHandler = this.svinout.bind(this);
//		this.spousteciPrvek.addEventListener('click', svinoutHandler);
		
		
//		this.zavritPrvek = document.querySelector('[data-rozvinout-svinout-zavrit="'+this.nazev+'"]');
//		this.zavritPrvek?.addEventListener('click', svinoutHandler);
		
		
		let CSS_cilovyPrvek = window.getComputedStyle(this.cilovePrvky[0]);
    	var transition_cilovyPrvek = CSS_cilovyPrvek.getPropertyValue('transition');		//cLog('transition_cilovyPrvek', transition_cilovyPrvek);
    
    	this.cilovePrvky.forEach( (el) => 
		{															
			var kompenzatorProstoru = el.closest('[data-rozvinout-svinout-kompenzator-prostoru]');
    		if (kompenzatorProstoru)
    		{
				kompenzatorProstoru.style.transition = transition_cilovyPrvek;
    			kompenzatorProstoru.style.height = '0px';
			}
			
			if (el.dataset.rozvinuto === '0') {vstupyVypZap (el, true);} else {vstupyVypZap (el, false);}
		});
	}
	
	rozvinoutSvinout ()
	{
		this.cilovePrvky.forEach( (el) => 
		{				
			if (el.dataset.rozvinuto === '0') 
			{
				// můžeme rozvinout?
				if (this.spousteciPrvek.type === 'radio')
				{
					if (this.spousteciPrvek.value !== el.dataset.vybranaHodnota) {return;}
				}
				
				rozvinout (el);
				vstupyVypZap (el, false);
			}
			
			else if (el.dataset.rozvinuto === '1') 
			{
				// můžeme svinout?
				if (this.spousteciPrvek.type === 'radio')
				{
					if (this.spousteciPrvek.value === el.dataset.vybranaHodnota) {return;}
				}
				
				svinout (el);
				vstupyVypZap (el, true);
			}
		});
	}
}
	
export async function rozvinout (el)
{											//cLog('el', el, rozvinout);	
	//		this.rodOverflow_vyp();			
	
	var vyska = el.scrollHeight; 
	el.style.height = '0px';
	await pauza (0);
	el.style.height = vyska+'px';
	el.style.visibility = 'visible';
	el.dataset.rozvinuto = '1';
	
	var kompenzatorProstoru = el.parentNode;
	if ( ("rozvinoutSvinoutKompenzatorProstoru" in kompenzatorProstoru.dataset) )
	{
		kompenzatorProstoru.style.height = vyska+'px';
	}
}

export async function svinout (el)
{				
	if (isString(el)) {el = document.querySelector(el);}
		
	el.addEventListener('transitionend', svinoutDokoncit, { once: true }); 			//cLog('el', el, svinout);
	el.style.height = '0px';
	el.style.borderWidth = '0px';	
	el.dataset.rozvinuto = '0';
		
	var kompenzatorProstoru = el.parentNode;
	if ( ("rozvinoutSvinoutKompenzatorProstoru" in kompenzatorProstoru.dataset) )
	{
		kompenzatorProstoru.style.height = '0px';
	}
}

function svinoutDokoncit(e)
{										//console.log('zavritDokoncit');
	this.style.visibility = 'hidden';
	this.style.height = '';
	this.style.borderWidth = '';
	
//	this.rodOverflow_zap();
}








