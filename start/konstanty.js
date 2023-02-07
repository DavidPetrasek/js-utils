import {jeDotykoveZarizeni} from '/p-system/jadro/moduly/js/fce.js';


export const DOTYKOVE_ZARIZENI = jeDotykoveZarizeni ();

if (typeof G_WP_URL_SABLONA !== 'undefined') {var url_sablona = G_WP_URL_SABLONA;}
else 									  	 {var url_sablona = '';}
export const URL_SABLONA = url_sablona;
