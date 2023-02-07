import * as ost from '/p-system/jadro/moduly/js/fce.js';

export function hnedPoNacteni ()
{
	
	
	await ost.vykonatFci ( JSON.parse(this.xhr.responseText) );
}