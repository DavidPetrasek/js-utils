import { elCreate } from './element/util';


export function maintenanceModeNotifier (axios: any)
{
//	cLog('APP_MAINTENANCE_MODE_STATE', APP_MAINTENANCE_MODE_STATE, maintenanceModeNotifier);
	
// @ts-expect-error TS(2304): Cannot find name 'APP_MAINTENANCE_MODE_STATE'.
	if (APP_MAINTENANCE_MODE_STATE === 'is_not_planned') 
	{
		var checkInterval_minutes = 5;
	}
// @ts-expect-error TS(2304): Cannot find name 'APP_MAINTENANCE_MODE_STATE'.
	else if (APP_MAINTENANCE_MODE_STATE.message_notify_before) 
	{					   		  
		var checkInterval_minutes = 1;
	}
// @ts-expect-error TS(2304): Cannot find name 'APP_MAINTENANCE_MODE_STATE'.
	else if (APP_MAINTENANCE_MODE_STATE.user_was_logged_out) 
	{					   		  
		setTimeout(() => 
		{			
			axios.post('/maintenance/ajax/check', {})
// @ts-expect-error TS(7006): Parameter 'response' implicitly has an 'any' type.
			.then( async function (response) 
			{
				location.reload();	
			});
		}, 15000);
	}	
	
	var currentIteration = 1; 
	
	var interval = setInterval(async function()
	{		
		if (currentIteration % checkInterval_minutes === 0) 
		{	
			axios.post('/maintenance/ajax/check', {})
// @ts-expect-error TS(7006): Parameter 'response' implicitly has an 'any' type.
			.then( async function (response) 
			{
//				cLog('response', response, maintenanceModeNotifier);
				
				if (response.data.message_notify_before) 
				{			
					checkInterval_minutes = 1;
					flashMessage(response.data.message_notify_before, 9000, 'notice');
				}
				else if (response.data.user_was_logged_out) 
				{		
					location.reload();
				}
			});
		}
		++currentIteration;
	}
	, 60000);  // Repeat every minute
}

// @ts-expect-error TS(7006): Parameter 'ems' implicitly has an 'any' type.
export function emToPx (ems)
{
	var bodyStyle = window.getComputedStyle(document.body, null).getPropertyValue('font-size');
	var bodyFontSize = parseFloat(bodyStyle); 					//cLog ('bodyFontSize', bodyFontSize);
		
	return ems * bodyFontSize;
}
// @ts-expect-error TS(7006): Parameter 'px' implicitly has an 'any' type.
export function pxToEm (px)
{
	var bodyStyle = window.getComputedStyle(document.body, null).getPropertyValue('font-size');
	var bodyFontSize = parseFloat(bodyStyle); 					//cLog ('bodyFontSize', bodyFontSize);
		
	return px / bodyFontSize;
}

// @ts-expect-error TS(7006): Parameter 'values' implicitly has an 'any' type.
export function createEnum(values) 
{
	const enumObject = {};
	
	for (const val of values)
	{
// @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
		enumObject[val] = val;
	}
	
	return Object.freeze(enumObject);
}

// @ts-expect-error TS(7006): Parameter 'a' implicitly has an 'any' type.
export function rot13_decode(a) 
{
    // @ts-expect-error TS(7006): Parameter 'c' implicitly has an 'any' type.
    return a.replace(/[a-zA-Z]/g, function(c){
      return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
}

// @ts-expect-error TS(7006): Parameter 'popis' implicitly has an 'any' type.
export function cLog (popis, hod = null, fce = null)
{
// @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
	if (fce !== null) {popis = fce.name+' :: '+popis;}
	
	console.log (popis, hod);
}

// @ts-expect-error TS(7006): Parameter 'popis' implicitly has an 'any' type.
export function cErr(popis, hod = null, fce = null)
{
// @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
	if (fce !== null) {popis = fce.name+' :: '+popis;}
	
	console.error(popis, hod);
}

export function flashMessage (zprava = '', trvani = 1500, cssClass = '')
{
	var elAttry = {role: 'alert', class: 'flash_message '+cssClass}; 
	var el = elCreate ('div', elAttry, zprava);
	document.body.appendChild(el);
	
	var odpocet = setTimeout( ()=>
	{
		el.remove();
	}, trvani);
}

// @ts-expect-error TS(7006): Parameter 'kam' implicitly has an 'any' type.
export async function redirect (kam, afterMiliseconds = 0)
{														
	await pause(afterMiliseconds);
	
	if (kam === '') //aktuální url
	{
		location.reload();
	}
	else
	{
		location.href = kam;
	}
}

// @ts-expect-error TS(7006): Parameter 'ms' implicitly has an 'any' type.
export function pause (ms) { return new Promise(res => setTimeout(res, ms)); }

export function timestamp (format = 'seconds') 
{
	if (format === 'seconds')
	{
		return Math.floor(Date.now() / 1000);	
	}
	if (format === 'milliseconds')
	{
		return Date.now();	
	}
}


