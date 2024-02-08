//import {vytvorElem} from '/p-system/jadro/moduly/js/elementy/fce.js';
//import {nabidkaZobrazitSkryt} from '/p-system/jadro/moduly/js/elementy/svinout.js';


// podle hodnoty atributu value vybere podnabidku s touto hodnotou v data-
export async function nabidkaPodnabidka (e, nahrat = false)
{																	//console.log(e.type);
	if (e.type === 'DOMContentLoaded'  ||  e.type === 'load'  ||  nahrat)
	{														//console.log('\nDOMContentLoaded');
		document.querySelectorAll('[data-nabidka]').forEach( (rodicNabidka) => 
		{														//console.log('\nrodElem: ', rodicNabidka);
			nabidkaPodnabidka_ (rodicNabidka);
		});
	}
	else if (e.type === 'change')
	{									//console.log('\nchange');
		var rodicNabidka;
		if		(e.target.dataset.nabidka)			{rodicNabidka = e.target;}
		else if (e.target.closest('[data-nabidka]'))	{rodicNabidka = e.target.closest('[data-nabidka]');}
	
		if		(!rodicNabidka)						{return;}
		
		nabidkaPodnabidka_ (rodicNabidka);
	}
}

function nabidkaPodnabidka_ (rodicNabidka)
{											var ob = false;
	// rodič je určen 
	if (rodicNabidka.dataset.rodElem_qsel) 
	{												//console.log('rodič je určen (qSel): '+rodicNabidka.dataset.rodElem_qsel);
		var rodElem = document.querySelector(rodicNabidka.dataset.rodElem_qsel);	//console.log(rodElem);
		ob = nabidkaPodnabidkaZiskat (rodicNabidka, rodElem);
	}
	else // rodič se musí najít
	{											//console.log('rodič se musí najít');
		var rodElem = rodicNabidka.parentNode; //console.log(rodElem);
			
		while (!ob)  // jít nahoru v hierarchii pokud se nenajde
		{
			ob = nabidkaPodnabidkaZiskat (rodicNabidka, rodElem);
			rodElem = rodElem.parentNode;	//console.log(rodElem);
		}
	}
	
	nabidkaPodnabidkaZobraz (ob, rodElem);				
}

function nabidkaPodnabidkaZiskat (rodicNabidka, rodElem)
{			
	var rodicNabidka_nazev = rodicNabidka.dataset.nabidka;	//console.log('rodicNabidka_nazev:'+rodicNabidka_nazev);
	var rodicVybranaHod	   = rodicNabidka.value;			//console.log('rodicVybranaHod:'+rodicVybranaHod);
	var rodicTyp	   	   = rodicNabidka.type;					//console.log('rodicTyp:'+rodicTyp);
	
	var checkedObracene = rodicNabidka.dataset.checkedObracene; //console.log('checkedObracene:'+checkedObracene);
	var zaskrtnutoPodminka;
	if (checkedObracene !== undefined) {zaskrtnutoPodminka = rodicNabidka.checked;}
	else					 	  	   {zaskrtnutoPodminka = !rodicNabidka.checked;}

//	console.log(rodElem);
	var vsechnyPodnabidky = rodElem.querySelectorAll('[data-rodic-nabidka="'+rodicNabidka_nazev+'"]');	//console.log(vsechnyPodnabidky);
	var podNabidky = rodElem.querySelectorAll('[data-rodic-nabidka="'+rodicNabidka_nazev+'"][data-rodic-vybrana-hodnota="'+rodicVybranaHod+'"]');
	
	//	console.log('\n');
//	console.log('podNabidky: '); console.log(podNabidky);
//	console.log('rodicNabidka_nazev:'+rodicNabidka_nazev);
//	console.log('rodicVybranaHod:'+rodicVybranaHod);
//	console.log('rodicTyp:'+rodicTyp);
//	console.log('zaskrtnutoPodminka:'+zaskrtnutoPodminka);
	
	if (podNabidky.length === 0) {return false;}
	else 
	{		
		return {
				vsechnyPodnabidky: vsechnyPodnabidky,
				podNabidky: [...podNabidky],
				zaskrtnutoPodminka: zaskrtnutoPodminka,
				rodicTyp: rodicTyp
		}
	}
}


function nabidkaPodnabidkaZobraz (ob, rodElem)
{	
	ob.vsechnyPodnabidky.forEach( (p) => 
	{										//console.log(p);		
		// je procházená podnabídka obsažena v podNabidky?
		const jeAktPodnab = ob.podNabidky.find((el) => el === p);
		
		if (jeAktPodnab)
		{								//console.log('jeAktPodnab: ');	console.log(p);													
			if ( (ob.rodicTyp === 'checkbox' || ob.rodicTyp === 'radio')  &&  ob.zaskrtnutoPodminka)
			{
				nabidkaZobrazitSkryt(p, rodElem, false);		
				vstupyVypZap (p, true);
			}
			
			else if (!jenSkryteElem(p))
			{
				nabidkaZobrazitSkryt(p, rodElem, true);				
				vstupyVypZap (p, false);
			}
			
			else if (jenSkryteElem(p))
			{
				vstupyVypZap (p, false);
			}
			
			// vypnout srolované děti
			var srolovaneDeti = p.querySelectorAll('[data-rodic-nabidka][data-srolovano="true"]');
			srolovaneDeti.forEach( (sd) => 
			{
				vstupyVypZap (sd, true);
			});
			
			// opravit nezaškrtnuté přepínače, pokud je podnabíka obsahuje
			var radios = p.querySelectorAll('input[type="radio"]');
			radios.forEach( (r) => 
			{											
				if (r.hasAttribute('checked') && !r.checked)
				{					
					setTimeout( ()=> {r.checked = true;}, 600);	//console.log('zaškrtává se nezaškrtnutý přepínač');
				}
			});
		}
		else
		{
			// je rodič této podnabídky radio a je zaškrtnutý
			var rodicAktPodnabidky = document.querySelector('[name="'+p.dataset.rodicNabidka+'"][value="'+p.dataset.rodicVybranaHodnota+'"]');

			if ( rodicAktPodnabidky  &&  (rodicAktPodnabidky.type === 'radio')  &&  rodicAktPodnabidky.checked) {return;} //console.log('rodicAktPodnabidky - zaškrtnuto:');
			
//			console.log('není AktPodnab: ');	console.log(p);	
			
			nabidkaZobrazitSkryt(p, rodElem, false);		
			vstupyVypZap (p, true);
		}
	});
}

function nabidkaZobrazitSkryt(el, rod, rozevrit = null) 
{															//console.log('nabidkaZobrazitSkryt - el: '); console.log(el);	    
	var smery = el.getAttribute('data-sroluj-smery');
	var srolovano = el.getAttribute('data-srolovano'); //console.log(srolovano);	  
	
	if (rozevrit === true) //|| srolovano === 'false'  
	{						
//		var smery_pole = [];
//		if (smery.includes('H')) {smery_pole.push('height');}
//		if (smery.includes('W')) {smery_pole.push('width');}
		
		expandSection(el, rod, smery);
	} 
	else if (rozevrit === false  &&  srolovano === 'false') //|| srolovano === 'true'
	{
		if (smery.includes('H')) {collapseSection(el, 'height');}
		if (smery.includes('W')) {collapseSection(el, 'width');}		  
	}
}


//function nabidkaPodnabidkaMaxWH (p)
//{											//console.log(p);
//	var animMaxH = true;
//	var animMaxW = true;
//	var animMaxPouze = p.dataset.animMaxPouze;
//	if (animMaxPouze !== undefined)
//	{
//		if 		(animMaxPouze === 'height') {animMaxW = false;}
//		else if (animMaxPouze === 'width') {animMaxH = false;}	//console.log('animMaxW:'+animMaxW); console.log('animMaxH:'+animMaxH);
//	}
//	
//	return {
//			W: animMaxW,
//			H: animMaxH
//	}
//}

