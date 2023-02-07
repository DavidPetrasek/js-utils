import {pauza, cas, cLog} from '/p-system/jadro/moduly/js/fce.js';


export class Mys
{								
	constructor ()
	{	
		this.poz = {x: 0, y: 0};
		this.aktPosun = {x: 0, y: 0};
		this.pozP = {x: 0, y: 0};
		this.pozP_zaloha = {x: 0, y: 0};	// poslední pozice je tak k dispozici i po vykonání dejPoz(e)
		this.smerPohybu = {nahoru: false, vpravo: false};
		this.zmacknuto = false;
		this.zmacknuto_casPosl = 0;
		this.uvolneno_casPosl = 0;
		
//		this.debMobil =	document.querySelector('[class="hlavicka-menu-pozadi-p"]');
							
		var dejPozHandler = this.dejPoz.bind(this);	
		document.addEventListener('touchstart', dejPozHandler);
		document.addEventListener('touchmove', dejPozHandler);
		document.addEventListener('mousemove', dejPozHandler);
		
		var zmacknuto_Handler = this.zmacknuto_.bind(this);
		document.addEventListener('mousedown', zmacknuto_Handler);
		document.addEventListener('mouseup', zmacknuto_Handler);
		document.addEventListener('touchstart', zmacknuto_Handler);
		document.addEventListener('touchend', zmacknuto_Handler);
	}
	
	dejPoz(e)
	{	
		if ( e.type == 'touchstart' || e.type == 'touchmove')
		{
	    	this.poz.x = e.touches[0].clientX;		
	   		this.poz.y = e.touches[0].clientY;
	  	}
		else 
		{
	    	this.poz.x = e.clientX;			//console.log( 'mousePosX: '+mousePosX );
	   		this.poz.y = e.clientY;			//console.log( 'mousePosY: '+mousePosY );
		}
		
		this.aktPosun.x = this.poz.x - this.pozP.x; 			
	    this.aktPosun.y = this.poz.y - this.pozP.y; 			//cLog( 'this.aktPosun.y', this.aktPosun.y, this.dejPoz);
		
		this.dejPozPosl();
		this.dejSmer();
	}
	
	dejPozPosl()
	{	
		this.pozP_zaloha.x = this.pozP.x;
		this.pozP_zaloha.y = this.pozP.y;
		
		this.pozP.x = this.poz.x;
		this.pozP.y = this.poz.y;
	}
	
	dejSmer()
	{	
		if 		(this.aktPosun.y < 0)	{this.smerPohybu.nahoru = true;} //console.log ('dejSmer :: nahoru');
		else if (this.aktPosun.y > 0)	{this.smerPohybu.nahoru = false;} //console.log ('dejSmer :: dolu'); 
	}
	
	zmacknuto_ (e)
	{																
		if 		(e.type === 'mousedown' || e.type === 'touchstart') 
		{
			this.zmacknuto = true; this.zmacknuto_casPosl = cas(); 
//			this.debMobil.innerHTML = 'zmacknuto_ :: DOWN';		//console.log ('zmacknuto_ :: DOWN');
		}
		else if (e.type === 'mouseup' || e.type === 'touchend')   
		{
			this.zmacknuto = false; this.uvolneno_casPosl = cas();
//			this.debMobil.innerHTML = 'zmacknuto_ :: UP';	//console.log ('zmacknuto_ :: UP');
		}
	}
}




















