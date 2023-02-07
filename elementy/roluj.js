import {pauza, cas, cLog, isString, preventDefault} from '/p-system/jadro/moduly/js/fce.js';


export async function rolujNahrajDalsi_nahoru (html, qSelRod)
{	
	var el = document.querySelector(qSelRod);				//cLog('el', el, rolujNahrajDalsi_nahoru);
	
//	if (window.mys.zmacknuto) {el.style.overflow = 'hidden';}
	
	var scrollHeight_posl = el.scrollHeight;		//cLog('scrollHeight_posl', scrollHeight_posl, rolujNahrajDalsi_nahoru);
	var scrollTop_posl = el.scrollTop;				//cLog('scrollTop_posl', scrollTop_posl, rolujNahrajDalsi_nahoru);
	
//	await ( async() => 
//	{
	
		await ( async() => 
		{
			el.insertAdjacentHTML ('afterbegin', html);
		} )();
		
		var obsahVyskaRozdil = el.scrollHeight - scrollHeight_posl;					//cLog('obsahVyskaRozdil', obsahVyskaRozdil, rolujNahrajDalsi_nahoru);
		el.scrollTop = scrollTop_posl + obsahVyskaRozdil;							//cLog('nový scrollTop', el.scrollTop, rolujNahrajDalsi_nahoru);
		
//		cLog('nová výška', el.scrollHeight, rolujNahrajDalsi_nahoru);
		
//	} )();
	
//	if (window.mys.zmacknuto) 
//	{
//		await pauza(500);
//		el.style.overflow = 'auto';
//	}
}

export function rolujDolu (el)
{
	if (isString(el)) {el = document.querySelector(el);}
	
	if (el.dataset.ignorovatRolujDolu === '1') {return;}
	
	var scrollTop = el.scrollHeight - el.clientHeight;	//cLog('začít od spoda - el.scrollTop', el.scrollTop, rolujNahrajDalsi);
	
	el.scroll( { top: scrollTop,  left: 0,  behavior: 'smooth'} );
}


async function vypnoutRolovani(el) 
{
	// modern Chrome requires { passive: false } when adding event
	var supportsPassive = false;
	try {
	  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
	    get: function () { supportsPassive = true; } 
	  }));
	} catch(e) {}
	
	var wheelOpt = supportsPassive ? { passive: false } : false;
	var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
	
	el.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
	el.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
	el.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function preventDefaultForScrollKeys(e)
{
	var keys = {37: 1, 38: 1, 39: 1, 40: 1};
	
  	if (keys[e.keyCode]) 
  	{
    	preventDefault(e);
    	return false;
  	}
}




















