import { cLog, flashMessage } from '../misc.js';


export function showFlashMessages (APP_FLASHES: any)
{
    	// cLog('_APP_FLASHES', APP_FLASHES);
	
// @ts-expect-error TS(2550): Property 'entries' does not exist on type 'ObjectC... Remove this comment to see the full error message
	for (let [typ, zpravy] of Object.entries(APP_FLASHES)) 
	{
//		cLog('zpravy', zpravy);	
//		zpravy.push('awfawfawfawf');		
   		flashMessage(zpravy.join('<br>'), 5000, typ);
	}
}