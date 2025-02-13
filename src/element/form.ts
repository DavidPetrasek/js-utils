
export function setDisabledStateChildInputs (parent : HTMLElement, state : boolean) : void
{
	parent.querySelectorAll('input, select, canvas, textarea').forEach( (i) =>
	{																					
		if ( i instanceof HTMLElement && ("disabled" in i.dataset) ) 
		{									
			i.dataset.disabled = state ? 'true' : 'false';
		}
		else
		{
			if (state) {i.setAttribute('disabled', '');}
			else	   {i.removeAttribute('disabled');}
		}
	});
}

export function getFileNames(fileInp : HTMLInputElement) : string[]
{                                       
	var fileNames : string[] = [];
	let fileList = fileInp.files;	if (!fileList) {return fileNames;}
	
	for (var i = 0; i < fileList.length; ++i)
	{
		var fileName = fileList.item(i)?.name.split('\\').pop();	
		if (!fileName) {continue;}
		fileNames.push(fileName);
	}

	return fileNames;
}