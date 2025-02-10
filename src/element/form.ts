import { elCreate } from "./util";


export function formAddHiddenInput (form: any, data: any) 
{
    if (typeof form === 'string') 
    {
        form = document.querySelector(form);
	}

// @ts-expect-error TS(2550): Property 'entries' does not exist on type 'ObjectC... Remove this comment to see the full error message
	Object.entries(data).forEach(entry => 
	{
  		const [key, value] = entry;
  		
		var inp = elCreate ('input', {type: 'hidden', name: key, 'value': value});		

        form.appendChild(inp);
    });
}

// @ts-expect-error TS(7006): Parameter 'formData' implicitly has an 'any' type.
export async function formData_appendObject (formData, object)
{
	for ( var key in object ) 
	{
	    formData.append(key, object[key]);
	}
}

// @ts-expect-error TS(7006): Parameter 'name' implicitly has an 'any' type.
export function vstupNastavitHodnotu (name, hod, viceHodIndex = null, rod = document)
{
	if (viceHodIndex) 
	{																					
		var vst = rod.getElementsByName(name)[ viceHodIndex ];	
	}
	else
	{
// @ts-expect-error TS(2403): Subsequent variable declarations must have the sam... Remove this comment to see the full error message
		var vst = rod.querySelector('[name="'+name+'"]');
	}
	
	if (!vst) {return;}
// @ts-expect-error TS(2339): Property 'value' does not exist on type 'HTMLEleme... Remove this comment to see the full error message
	vst.value = hod;
}

/**
 * 
 * @param Element parent 
 * @param bool state
 */
// @ts-expect-error TS(7006): Parameter 'parent' implicitly has an 'any' type.
export function formSetDisabledStateChildInputs (parent, state)
{
// @ts-expect-error TS(7006): Parameter 'i' implicitly has an 'any' type.
	parent.querySelectorAll('input, select, canvas, textarea').forEach( (i) =>
	{																					
		if ( ("disabled" in i.dataset) ) 
		{									
			i.dataset.disabled = state;
		}
		else
		{
			if (state)	
			{
				i.setAttribute('disabled', '');
			}
			else		
			{
				i.removeAttribute('disabled');
			}
		}
	});
}

/**
 * 
 * @param fileInp - input type="file"
 * @returns Array
 */
// @ts-expect-error TS(7006): Parameter 'fileInp' implicitly has an 'any' type.
export function getFileNames(fileInp)
{                                       
	var fileNames = [];
	
	for (var i = 0; i < fileInp.files.length; ++i)
	{
		var fileName = fileInp.files.item(i).name.split('\\').pop();  
		fileNames.push(fileName);
	}

	return fileNames;
}