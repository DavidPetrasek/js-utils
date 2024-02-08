import * as konstanty from '/p-system/jadro/moduly/js/start/konstanty.js';
import {fcePoNacteni} from '/p-system/jadro/moduly/js/fce.js';


export class Kanvas
{								
	constructor (id, kreslitMysi = false, vystupniFormat = 'image/png', rozmeryResponzivni = null)
	{													//cLog('kreslitMysi', kreslitMysi);
		this.ks = document.getElementById(id);
		this.ks_rect = this.ks.getBoundingClientRect();
		this.ctx = this.ks.getContext('2d');
//		this.tr = this.ctx.getTransform();
		this.sirka = this.ks.width;
		this.vyska = this.ks.height;
		
		this.vystupniFormat = vystupniFormat;
		
		// pro vykreslení
		this.tvary = [];
		this.texty = [];
		
		var handler_aktRect = this.aktRect.bind(this);	
		document.addEventListener('scroll', handler_aktRect);
		
		if (kreslitMysi)
		{															//cLog('kreslitMysi', null, this.kreslitMysi);
			var handler_kreslitMysi = this.kreslitMysi.bind(this);	
			document.addEventListener('mousemove', handler_kreslitMysi);
			document.addEventListener('touchmove', handler_kreslitMysi);
		}
		
		var vycistitPlatno = document.querySelector('[name="kanvas-vycistit-platno"]');		//cLog('vycistitPlatno', vycistitPlatno);
		if (vycistitPlatno)
		{
			var handler_vycistit = this.vycistit.bind(this);	
			vycistitPlatno.addEventListener('click', handler_vycistit);
		}
		
		var ulozit = document.querySelector('[name="kanvas-ulozit"]');		//cLog('ulozit', ulozit);
		if (ulozit)
		{
			var handler_ulozitB64 = this.ulozitB64.bind(this);	
			ulozit.addEventListener('click', handler_ulozitB64);
		}
		
		this.rozmeryResponzivni = rozmeryResponzivni;	//cLog('this.rozmeryResponzivni', this.rozmeryResponzivni);
		
		if (this.rozmeryResponzivni !== null)
		{
			var handler_rozmery = this.rozmery.bind(this);	
			fcePoNacteni (handler_rozmery);
//			window.addEventListener('DOMContentLoaded', handler_rozmery);
			window.addEventListener('resize', handler_rozmery);
		}
		
		
		if (konstanty.DOTYKOVE_ZARIZENI) 
		{
			document.addEventListener('touchstart', (e) =>
			{
				if (e.target === this.ks) 
				{
					var windowScrollY = window.scrollY;		//cLog('windowScrollY', windowScrollY);
					
					if (document.body.classList.contains('rolovani-vypnout')) {return;}
					
					document.body.classList.add('rolovani-vypnout');
					
					document.body.style.top = -windowScrollY+'px';
				}
				
				else if (e.target !== this.ks) 
				{
					if (!document.body.classList.contains('rolovani-vypnout')) {return;}
					
					document.body.classList.remove('rolovani-vypnout');
					
					cLog('document.body.style.top', document.body.style.top);
					
					var bodyTop = Math.abs(parseInt(document.body.style.top));	cLog('bodyTop', bodyTop);
					
					document.body.style.top = '';	
					
					window.scrollTo(0, bodyTop);
				}
			});
		}
	}
	
	aktRect()
	{
		this.ks_rect = this.ks.getBoundingClientRect();
	}
	
	vykreslit()
	{
		if (this.ks.dataset.disabled === 'true') {return;}
		
		this.ctx.clearRect(0, 0, this.sirka, this.vyska);
		
		for (var i=0; i<this.tvary.length ;i++)
		{
			if (this.tvary[i].shape === 'rect')
			{
	    		drawRect(this.tvary[i]);
	    	}
		}
	
		for (var i=0; i<this.texty.length ;i++)
		{
	    	drawText(this.texty[i]);
	
			if (this.texty[i].editable)
			{
				borderSameAs(this.texty[i]);
				drawRectBorder(borders[0]);
			}
		}
		
//		drawImg_();
	}
	
	kreslitMysi ()
	{
		if (this.ks.dataset.disabled === 'true') {return;}
		if (!window.mys.zmacknuto) {return;}
		
		// převést globální pozici myši do kanvasu 	
		var pozX = window.mys.poz.x - this.ks_rect.left;		//cLog('pozX', pozX);
		var pozY = window.mys.poz.y - this.ks_rect.top;			//cLog('pozY', pozY);	
		var pozPX = window.mys.pozP_zaloha.x - this.ks_rect.left;		//cLog('pozPX', pozPX);
		var pozPY = window.mys.pozP_zaloha.y - this.ks_rect.top;		//cLog('pozPY', pozPY);
		
//		cLog('rozdíl Y', pozPY - pozY);
		
        this.ctx.beginPath();
        
        this.ctx.strokeStyle = '#5164a0';
        this.ctx.lineWidth = 2;
        
        this.ctx.moveTo(pozPX, pozPY);
        this.ctx.lineTo(pozX, pozY);
//		this.ctx.moveTo(20, 20);
//		this.ctx.lineTo(160, 20);
        
        this.ctx.stroke();
//        this.ctx.closePath();
    }
    
    vycistit()
	{
		this.ctx.clearRect(0, 0, this.sirka, this.vyska);
		
		this.tvary = [];
		this.texty = [];
	}
	
	ulozitB64()
	{
		 var b64 = this.ks.toDataURL(this.vystupniFormat);
		 
		 const pripona = b64.split(';')[0].split('/')[1];	//cLog('pripona', pripona);
		 
		 var fotoVystup = {base64: b64, format: this.vystupniFormat, pripona: pripona};
		 
		 return this.ulozitB64_potom(fotoVystup);
	}
	
	// vlastní akce
	ulozitB64_potom(fotoVystup)
	{
		 return fotoVystup;
	}
	

	rozmery ()
	{														//cLog('this.rozmeryResponzivni', this.rozmeryResponzivni, this.rozmery);
		if (this.rozmeryResponzivni.mobil  &&  window.innerWidth < 768)
		{
			this.sirka = this.ks.width = this.rozmeryResponzivni.mobil.W; 
			this.vyska = this.ks.height = this.rozmeryResponzivni.mobil.H;
		} 															
		else if (this.rozmeryResponzivni.tablet_na_vysku  &&  window.innerWidth >= 768  &&  window.innerWidth < 1024)
		{
			this.sirka = this.ks.width = this.rozmeryResponzivni.tablet_na_vysku.W; 
			this.vyska = this.ks.height = this.rozmeryResponzivni.tablet_na_vysku.H;
		}
		else if (this.rozmeryResponzivni.tablet_na_sirku  &&  window.innerWidth >= 1024  &&  window.innerWidth < 1366)
		{
			this.sirka = this.ks.width = this.rozmeryResponzivni.tablet_na_sirku.W; 
			this.vyska = this.ks.height = this.rozmeryResponzivni.tablet_na_sirku.H;
		}
		else if (this.rozmeryResponzivni.laptop  &&  window.innerWidth >= 1366  &&  window.innerWidth < 1920)
		{
			this.sirka = this.ks.width = this.rozmeryResponzivni.laptop.W; 
			this.vyska = this.ks.height = this.rozmeryResponzivni.laptop.H;
		}
		else if (this.rozmeryResponzivni.full_hd  &&  window.innerWidth >= 1920  &&  window.innerWidth < 3840)
		{
			this.sirka = this.ks.width = this.rozmeryResponzivni.full_hd.W; 
			this.vyska = this.ks.height = this.rozmeryResponzivni.full_hd.H;
		}
		
		// použít nejmenší nastavenou hodnotu, pokud pro aktuální velikost displeje nebylo nic nastaveno
		else
		{
			var posledniExistujiciNastaveni = {};
			
			if (this.rozmeryResponzivni.full_hd)
			{
				posledniExistujiciNastaveni = this.rozmeryResponzivni.full_hd;
			}
			else if (this.rozmeryResponzivni.laptop)
			{
				posledniExistujiciNastaveni = this.rozmeryResponzivni.laptop;
			}
			else if (this.rozmeryResponzivni.tablet_na_sirku)
			{
				posledniExistujiciNastaveni = this.rozmeryResponzivni.tablet_na_sirku;
			}
			else if (this.rozmeryResponzivni.tablet_na_vysku)
			{
				posledniExistujiciNastaveni = this.rozmeryResponzivni.tablet_na_vysku;
			}			
			else if (this.rozmeryResponzivni.mobil)
			{
				posledniExistujiciNastaveni = this.rozmeryResponzivni.mobil;
			} 															
			
			
			
			
			
			this.sirka = this.ks.width = posledniExistujiciNastaveni.W; 
			this.vyska = this.ks.height = posledniExistujiciNastaveni.H;
		}
	}
}


