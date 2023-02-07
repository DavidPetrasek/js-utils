import {ajaxAkce} from '/p-system/jadro/moduly/ajax/jadro/akce.js';
import {formOdeslat} from '/p-system/jadro/moduly/vykreslit/form/ajax/odeslat.js';
import {rezimUdrzby} from '/p-system/jadro/moduly/js/start/rezim_udrzby.js';
import {fcePoNacteni} from '/p-system/jadro/moduly/js/fce.js';


document.addEventListener('click', ajaxAkce);


fcePoNacteni (start_HL);
function start_HL () 
{
	formOdeslat();
	if (typeof G_REZIM_UDRZBY_KAZDOU_X_MINUTU !== 'undefined') {rezimUdrzby();}
}