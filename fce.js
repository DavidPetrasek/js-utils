import {vytvorElem} from '/p-system/jadro/moduly/js/elementy/fce.js';
//import {nabidkaZobrazitSkryt} from '/p-system/jadro/moduly/js/elementy/svinout.js';


export function createEnum(values) 
{
	const enumObject = {};
	
	for (const val of values)
	{
		enumObject[val] = val;
	}
	
	return Object.freeze(enumObject);
}

export async function vykonatFce (odp) // TODO: ajaxFuncAfter //TODO: popř přesunout ke třídě Ajax NEBO přidat parameter typ (window[typ]...)
{
//		ost.cLog('odp', odp, this.odpovedet);	
	for (let o of odp) 
	{
//			ost.cLog('o.argy', o.argy, this.odpovedet);
//			ost.cLog('o.fce', o.fce, this.odpovedet);
	
		if (o.fce === 'blob') {o.argy.push(this.xhr);}
	
		if ( Array.isArray(o.argy) ) 
		{
			if (o.jine.await_) 
			{
				if (o.metodaTridy) 
				{
					await window[o.instanceTridy][o.metodaTridy](...o.argy);
				}
				else
				{
					await window[o.fce](...o.argy);
				}
			}
			else 			   
			{					
				if (o.metodaTridy) 
				{
					window[o.instanceTridy][o.metodaTridy](...o.argy);
				}
				else
				{
					window[o.fce](...o.argy);
				}
			}
		}	
		else {window[o.fce](o.argy);}	    		
	}
}

export async function vykonatFci (fce) // TODO: ajaxFuncAfter //TODO: popř přesunout ke třídě Ajax NEBO přidat parameter typ (window[typ]...)
{
	if (!fce.hasOwnProperty('await')) {fce.await = false;}
	
	if ( Array.isArray(fce.argy) ) 
	{
		if (o.jine.await_) 
		{
			if (o.metodaTridy) 
			{
				await window[o.instanceTridy][o.metodaTridy](...o.argy);
			}
			else
			{
				await window[o.fce](...o.argy);
			}
		}
		else 			   
		{					
			if (o.metodaTridy) 
			{
				window[o.instanceTridy][o.metodaTridy](...o.argy);
			}
			else
			{
				window[o.fce](...o.argy);
			}
		}
	}	
	else {window[o.fce](o.argy);}	    		
}

export function fcePoNacteni (fce)
{
	if (document.readyState === 'loading') 
	{
		document.addEventListener('DOMContentLoaded', fce);
	} 
	else if (document.readyState === 'interactive'  ||  document.readyState === 'complete')
	{
	    fce();
	}
}

export function windowPridatFce (objFce)
{
	for (let [fceNaz, fce] of Object.entries(objFce)) 
	{
//		ost.cLog('fceNaz', fceNaz);	ost.cLog('fce', fce);
		window[fceNaz] = fce;
	}
}

export function preventDefault(e) {e.preventDefault();}

export function rot13_decode(a) 
{
    return a.replace(/[a-zA-Z]/g, function(c){
      return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    })
}

export function jeDotykoveZarizeni ()
{
	return window.ontouchstart !== undefined;
}

export async function souborExistuje (url) 
{	
	return (await fetch(url, {method: "HEAD"})).ok;
	
//	return new Promise( async (resolve) =>
//	{
//		try 
//		{
//														//cLog('souborExistuje ??', null, souborExistuje);
//        	var r = await fetch(url, {method: "HEAD"});	//cLog('r', r, souborExistuje); 
//        	if (r.ok) 	{resolve(true);}
//        	else		{resolve(false);}
//	    } 
//	    catch(err) 
//	    {
////			cLog('souborn neexistuje', err, souborExistuje);
//			resolve(false);
//	    }
//	})
}

//export function souborExistuje(url)
//{
//    return new Promise( (resolve) => 
//    {
//        var http = new XMLHttpRequest();
//        http.open('HEAD', url);
//        http.onreadystatechange = () =>
//        {
//            if (http.readyState === 4) 
//            {
//                resolve(http.status === 200);
//            }
//        };
//        http.send();
//    });
//}


export var priponaMimeTyp = 
{
	'jpg': 'image/jpeg',
	'jpeg': 'image/jpeg',
	'png': 'image/png',
	'pdf': 'application/pdf',
	'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
};

export function mimeTypPodlePripony (pripona)
{
	if (priponaMimeTyp.hasOwnProperty(pripona)) 
	{
    	return priponaMimeTyp[pripona];
    }
    else
    {
		cLog('mimeTyp není definován');
		return false;	
	}
}

export function cLog (popis, hod = null, fce = null)
{
	if (fce !== null) {popis = fce.name+' :: '+popis;}
	
	console.log (popis, hod);
}


export function vytisknout_ (e)
{
	if ( !("vytisknout" in e.target.dataset) ) {return;} 
	
	var base64PDF = e.target.dataset.vytisknout;			//cLog ('base64PDF', base64PDF, vytisknout_);
	
	const content = base64ToArrayBuffer(base64PDF);
 	const blob = new Blob([content], { type: "application/pdf" });
 	const url = window.URL.createObjectURL(blob);			//cLog ('url', url, vytisknout_);
	
	vytisknout(url).then(()=>
	{
		window.URL.revokeObjectURL(url);	//cLog ('revokeObjectURL', '', vytisknout_);
	});
}

function vytisknout (cestaRel) // relativní cesta nebo url objektu
{		
	return new Promise( (resolve) =>
	{
								
	//	var w = window.open(G_URL_INDEX+cestaRel);		cLog ('w', w, vytisknout);
	//	w.print();
		let pdfFrame = document.body.appendChild(document.createElement('iframe'));
	    pdfFrame.style.display = 'none';
	    pdfFrame.onload = ( () =>
	    { 
			void pdfFrame.contentWindow.print();	//cLog ('vytisknuto', '', vytisknout);
			resolve(true);
		});
	    pdfFrame.src = cestaRel; 
    });   
}

export function base64ToArrayBuffer (data)
{
    const bString = atob(data);
    const bLength = bString.length;
    let bytes = new Uint8Array(bLength);
    for (let i = 0; i < bLength; i++) {
        const ascii = bString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}


export function zpravaBublina (zprava = '', trvani = 1500)
{
	var elAttry = {role: 'alert', class: 'zprava-bublina'}; 
	var el = vytvorElem ('p', elAttry, zprava);
	document.body.appendChild(el);
	
	var odpocet = setTimeout( ()=>
	{
		el.remove();
	}, trvani);
}


export function formatTel(e)
{
	if (e.keyCode != 8 && e.keyCode != 46) //tel_pred.value == 420 &&
    {
    	if ( e.target.value.length == 3 && !e.target.value.includes(' ') ) { e.target.value += ' '; }
        if ( e.target.value.length == 7 && e.target.value.match(/[' ']/g).length < 2 ) { e.target.value += ' '; }
	}
}


export async function presmerovat (kam, zpozdeni = 0)
{														//alert(G_URL_INDEX+kam); return;
	await pauza(zpozdeni);
	
	if (kam === '') //aktuální url
	{
		location.reload();
	}
	else
	{
		location.href = G_URL_INDEX+kam;
	}
}


export function isIterable (el)
{
  return Symbol.iterator in Object(el);
}

export function isString (myVar)
{
  return (typeof myVar === 'string' || myVar instanceof String);
}


export function pauza(ms) { return new Promise(res => setTimeout(res, ms)); }

export function cas (format = 'sekundy') 
{
	if (format === 'sekundy')
	{
		return Math.floor(new Date().getTime() / 1000);	
	}
	if (format === 'milisekundy')
	{
		return new Date().getTime();	
	}
}

export function evLisElem (e)
{
	if ( e.target )	{return e.target;} 
	else 			{return e;}	
}

export function strToBool (stringValue)
{
	switch(stringValue?.toLowerCase()?.trim()){
        case "true": 
        case "yes": 
        case "1": 
          return true;

        case "false": 
        case "no": 
        case "0": 
        case null: 
        case undefined:
          return false;

        default: 
          return JSON.parse(stringValue);
    }
}

export function fcePripravArgs(e, args)
{
	var argsN = [];
	
	args.forEach( (arg, ind) =>
	{									//console.log('fcePripravArgs :: arg', arg);
		if (arg === 'eTarget')
		{						
			argsN[ind] = e.target;		//console.log('fcePripravArgs :: arg', arg);
		}
		else if (arg === 'e')
		{						
			argsN[ind] = e;		//console.log('fcePripravArgs :: arr', arr);
		}
		
		else
		{						
			argsN[ind] = arg;	
		}
	});
	
	return argsN;
}


// pokud rodič má nastaveno style="max-height..., což neumožní zobrazit celý prvek
//export function korekceMaxRozmeru_pretekani(e)
//{																//console.log(e);
//	if (e.target) {var elMax = e.target.closest('[style*="max-height"]');}
//	else		  {var elMax = 		  e.closest('[style*="max-height"]');}	if (!elMax) {return;}
//	
//	var elMax_maxH = parseInt(elMax.style.maxHeight); 		//console.log('elMax_maxH: ' + elMax_maxH);
//	
//	setTimeout( ()=>
//	{
//		 var elMax_scrollH = elMax.scrollHeight;  			//console.log(elMax_scrollH);
//	
//		if (elMax_scrollH > elMax_maxH)
//		{													//console.log('korekce maxHeight (přetéká)');
//			elMax.style.maxHeight = elMax_scrollH+'px';
//		}
//	}, 30);	
//}


function jenSkryteElem (el)
{									var allHidden = true;
    [...el.children].forEach( (ch) =>
	{									
		if ( !ch.hidden  &&  ch.type !== 'hidden' ) {allHidden = false;} //console.log(ch);
	});
	
	return allHidden;
}


export function strictMode ()
{
	var strict = (function() { return !this; })();

	if (strict) {console.log ( "strict mode enabled, strict is " + strict );} 
	else 		{console.log ( "strict mode not defined, strict is " + strict );}
}


export async function pripravSoubory (file, zaNazev = '')
{												//cLog('file', file, pripravSoubory);
	var data = [];
		
	for (let f=0; f < file.files.length ; f++)
	{												//console.log(file.files[f]);
		var nazev = file.files[f].name.split('\\').pop();
		var pripona = nazev.split('.').pop();
		var soubor =
		{
			nazev: nazev + zaNazev,
			pripona: pripona,
			base64: await toBase64(file.files[f])
		}
//		console.log(soubor);
	
		data.push(soubor); //console.log(data);
	}

	return data;
}


const toBase64 = file => new Promise((resolve, reject) =>
{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const base64FromUrl = async (url) => 
{
  const data = await fetch(url);					//cLog('data', data, base64FromUrl);
  const blob = await data.blob();
//  const blob = new Blob([data], {type: 'image/gif'});
  
  return new Promise((resolve) => 
  {
    const reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = () => {
    var base64data = reader.result; 
    base64data = base64data;  //.split(',')[1]
      resolve(base64data);
    }
  });
}


export function jakoUziv (sendVal, rod = null)
{		
	var role = '', id = '';
		
	if ( typeof G_upravovanyUzivatel !== 'undefined') 
	{
		role = G_upravovanyUzivatel.role;
		id 	 = G_upravovanyUzivatel.id;
	}
	else if (rod !== null)
	{
		role = rod.querySelector('[name="jakoUzivRole"]')?.value; //console.log('jakoUziv role: '+role)		
		id 	 = rod.querySelector('[name="jakoUzivID"]')?.value; 	
	}	
	
	if (role && id)
	{
		var uziv = JSON.stringify({role: role, id: id});
	
		sendVal += '&jakoUziv='+uziv; //console.log('jakoUziv (sendVal): '+sendVal);

		sessionStorage.setItem('jakoUziv', uziv);	
	}
	
	return sendVal;
}


export function uzivKdo (sendVal, rod)
{		
	var role = rod.querySelector('[name="tvurce_role"]')?.value; //console.log('jakoUziv role: '+role)		
	var id 	 = rod.querySelector('[name="tvurce_id"]')?.value; 		
	
	if (role && id)
	{
		var uziv = JSON.stringify({role: role, id: id});
	
		sendVal += '&uzivKdo='+uziv; //console.log('jakoUziv (sendVal): '+sendVal);

	}
	
	return sendVal;
}


