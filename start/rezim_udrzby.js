import {Ajax} from '/p-system/jadro/moduly/ajax/jadro/hl.js';
import {cLog} from '/p-system/jadro/moduly/js/fce.js';


export function rezimUdrzby()
{
	rezimUdrzby_(true); // spustit ihned poprvé
	var interval = setInterval (rezimUdrzby_, 1000);
}

async function rezimUdrzby_ (poprve = false)
{ 
	if (!poprve)
	{
		var currentdate = new Date();  
		if (currentdate.getSeconds() !== 0) {return;} 
		if (currentdate.getMinutes() % G_REZIM_UDRZBY_KAZDOU_X_MINUTU !== 0) {return;}
	} 

	var vo = document.getElementById('VO_rezim_udrzby_');	
	if (vo) {vo.remove();}

	var AX = new Ajax ('/p-system/rezim_udrzby/bude.php');	
	AX.odeslat();
	
	await pauza (500);
	
	var vo = document.getElementById('VO_rezim_udrzby_');	
	if (vo) 
	{
		if (vo.querySelector('[data-zapnuto=""]')) {location.replace('https://'+window.location.hostname);}
	}
}