import {pauza, cas, cLog, isString} from '/p-system/jadro/moduly/js/fce.js'; 


export class JitNaSekci
{								
	constructor ()
	{	
		this.obaly = document.querySelectorAll('[data-jit-na-sekci-obal]');		//cLog('this.obaly', this.obaly);
//		this.aktSekceCislo = 1;

		
		// TLAČÍTKA UMOŽNÍ PŘEJÍT NA SPECIFIKOVANOU SEKCI  	//TODO: místo čísla může zadat predchozi/nasledujici
		document.addEventListener('click', (e) => 
		{
			if ( !("jitNaSekci" in e.target.dataset) ) {return;}		//cLog('!("jitNaSekci" in e.target.dataset) ', null);
			
			var obal = e.target.closest('[data-jit-na-sekci-obal]');		//cLog('obal', null);
			 if ( !obal ) {return;}
			
			this.jitNaSekci (obal, e.target.dataset.jitNaSekci); 
		});
		
		// nefunguje pokud se prvek přidá později
//		this.obaly.forEach( (o) =>
//		{																				
//				var jitNa = o.querySelector('[data-jit-na-sekci]');		if (!jitNa) {return;}
//				
//				jitNa.addEventListener('click', () => 
//				{
//					this.jitNaSekci (o, jitNa.dataset.jitNaSekci); 
//				});
//		});
	}
	
	jitNaSekci (obal, cisloNoveSekce)
	{											//cLog('nazevObalu', nazevObalu, this.jitNaSekci);
		cisloNoveSekce = parseInt(cisloNoveSekce);
	
		if (isString(obal))
		{
			obal = [...this.obaly].find( (o)=>
			{										//cLog('o.dataset.jitNaSekci', o.dataset.jitNaSekci);	cLog('o', o);
				return o.dataset.jitNaSekciObal === obal;
			});
		
	//		cLog('obal', obal, this.jitNaSekci);
		}
		
		var sekce = obal.querySelectorAll('[data-sekce]');
		
		sekce.forEach( (s) =>
		{										
			var cisloSekce = parseInt(s.dataset.sekce);
			
			if ( cisloSekce === cisloNoveSekce ) {s.classList.remove('none');}
			else					  			 		   {s.classList.add('none');}
		});
		
		
//		var ukazatelPostupuKroky = document.querySelectorAll('[data-progress-bar-step]');
//		ukazatelPostupuKroky.forEach( (st, i) =>
//		{												var stepNum = parseInt(st.dataset.progressBarStep);
//			if ( stepNum === parseInt(currStep) )
//			{											
//				st.classList.add('progress-bar-active-step');
//				st.classList.remove('step-completed');
//				ukazatelPostupuKroky[i-1].classList.add('step-completed'); //previous step is completed
//			}
//			else					  {st.classList.remove('progress-bar-active-step');}
//		});
	}
}


