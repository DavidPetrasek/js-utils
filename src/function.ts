
export function debounce(callback: any, wait: any) 
{
// @ts-expect-error TS(7034): Variable 'timeout' implicitly has type 'any' in so... Remove this comment to see the full error message
	let timeout;
// @ts-expect-error TS(7019): Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
	return (...args) => 
	{
// @ts-expect-error TS(7005): Variable 'timeout' implicitly has an 'any' type.
		clearTimeout(timeout);
// @ts-expect-error TS(2683): 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
		timeout = setTimeout(function () { callback.apply(this, args); }, wait);
	};
}

// @ts-expect-error TS(7006): Parameter 'fn' implicitly has an 'any' type.
export function domReady(fn) 
{
	if (document.readyState !== 'loading') 
	{
		fn();
	} 
	else
	{
		document.addEventListener('DOMContentLoaded', fn)
	}
}



// export async function vykonatFce (odp) // TODO: ajaxFuncAfter //TODO: popř přesunout ke třídě Ajax NEBO přidat parameter typ (window[typ]...)
// {	
// 	for (let o of odp) 
// 	{	
// 		if (o.fce === 'blob') {o.argy.push(this.xhr);}
	
// 		if ( Array.isArray(o.argy) ) 
// 		{
// 			if (o.jine.await_) 
// 			{
// 				if (o.metodaTridy) 
// 				{
// 					await window[o.instanceTridy][o.metodaTridy](...o.argy);
// 				}
// 				else
// 				{
// 					await window[o.fce](...o.argy);
// 				}
// 			}
// 			else 			   
// 			{					
// 				if (o.metodaTridy) 
// 				{
// 					window[o.instanceTridy][o.metodaTridy](...o.argy);
// 				}
// 				else
// 				{
// 					window[o.fce](...o.argy);
// 				}
// 			}
// 		}	
// 		else {window[o.fce](o.argy);}	    		
// 	}
// }

// export async function vykonatFci (fce) // TODO: ajaxFuncAfter //TODO: popř přesunout ke třídě Ajax NEBO přidat parameter typ (window[typ]...)
// {
// 	if (!fce.hasOwnProperty('await')) {fce.await = false;}
	
// 	if ( Array.isArray(fce.argy) ) 
// 	{
// 		if (o.jine.await_) 
// 		{
// 			if (o.metodaTridy) 
// 			{
// 				await window[o.instanceTridy][o.metodaTridy](...o.argy);
// 			}
// 			else
// 			{
// 				await window[o.fce](...o.argy);
// 			}
// 		}
// 		else 			   
// 		{					
// 			if (o.metodaTridy) 
// 			{
// 				window[o.instanceTridy][o.metodaTridy](...o.argy);
// 			}
// 			else
// 			{
// 				window[o.fce](...o.argy);
// 			}
// 		}
// 	}	
// 	else {window[o.fce](o.argy);}	    		
// }

// export function windowPridatFce (objFce)
// {
// 	for (let [fceNaz, fce] of Object.entries(objFce)) 
// 	{
// 		window[fceNaz] = fce;
// 	}
// }

// export function fcePripravArgs(e, args)
// {
// 	var argsN = [];
	
// 	args.forEach( (arg, ind) =>
// 	{									//console.log('fcePripravArgs :: arg', arg);
// 		if (arg === 'eTarget')
// 		{						
// 			argsN[ind] = e.target;		//console.log('fcePripravArgs :: arg', arg);
// 		}
// 		else if (arg === 'e')
// 		{						
// 			argsN[ind] = e;		//console.log('fcePripravArgs :: arr', arr);
// 		}
		
// 		else
// 		{						
// 			argsN[ind] = arg;	
// 		}
// 	});
	
// 	return argsN;
// }