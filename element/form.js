import { elCreate } from "./util";


export function formAddHiddenInput (form, data) 
{
    if (typeof form === 'string') 
    {
        form = document.querySelector(form);
	}

	Object.entries(data).forEach(entry => 
	{
  		const [key, value] = entry;
  		
		var inp = elCreate ('input', {type: 'hidden', name: key, 'value': value});		

        form.appendChild(inp);
    });
}

export async function formData_appendObject (formData, object)
{
	for ( var key in object ) 
	{
	    formData.append(key, object[key]);
	}
}

export function vstupNastavitHodnotu (name, hod, viceHodIndex = null, rod = document)
{
	if (viceHodIndex) 
	{																					
		var vst = rod.getElementsByName(name)[ viceHodIndex ];	
	}
	else
	{
		var vst = rod.querySelector('[name="'+name+'"]');
	}
	
	if (!vst) {return;}
	vst.value = hod;
}

/**
 * 
 * @param Element parent 
 * @param bool state
 */
export function formSetDisabledStateChildInputs (parent, state)
{
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