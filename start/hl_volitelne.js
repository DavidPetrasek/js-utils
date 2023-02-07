import {vytisknout_} from '/p-system/jadro/moduly/js/fce.js';
import {rozvinoutSvinout_priprav} from '/p-system/jadro/moduly/js/elementy/fce.js';
import {SelectVlastni} from '/p-system/jadro/moduly/js/start/select.js';
import {eMailObfuskace_priprav} from '/p-system/jadro/moduly/vzdalena_komunikace/e_mail/obfuskace/hl.js';
import {Mys} from '/p-system/jadro/moduly/js/mys.js';


window.selectVlastni = new SelectVlastni();
window.mys = new Mys();


document.addEventListener('DOMContentLoaded', () => 
{
	document.addEventListener('click', vytisknout_);
	eMailObfuskace_priprav();
	rozvinoutSvinout_priprav();
});