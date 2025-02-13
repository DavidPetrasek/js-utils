
export function toBase64 (file : Blob) : Promise<string>
{
    return new Promise((resolve, reject) =>
    {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => 
            {
                if (typeof reader.result === 'string')  {resolve(reader.result);}
                else                                    {resolve('');}
            }
        reader.onerror = error => reject(error);
    })
}

export const base64FromUrl = async (url : string) : Promise<string> => 
{
  const data = await fetch(url);
  const blob = await data.blob();
  
  return new Promise((resolve) => 
  {
    const reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = () => 
    {
        var base64data = reader.result;
        if (typeof base64data === 'string') {resolve(base64data);}
        else                                {resolve('');}
    }
  });
}

export async function downloadStream (data : string, headers : Headers) : Promise<void>
{																
    var contentDisposition = headers.get('content-disposition');
	var filename = contentDispositionGetFileName(contentDisposition ?? '');
    var mimeType = headers.get('content-type');
	
	// Create link
	var blob = new Blob([data], { type: mimeType ?? '' });
	
    var link = document.createElement('a');
    const blobUrl = window.URL.createObjectURL(blob);
    link.href = blobUrl;
    link.download = filename;

	// Download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // clean up Url
    window.URL.revokeObjectURL(blobUrl);
}

function contentDispositionGetFileName (contentDisposition : string) : string
{
    var filename = '';

    if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) 
    {
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(contentDisposition);
        if (matches != null && matches[1]) 
        { 
          filename = matches[1].replace(/['"]/g, '');
        }
    }
    
    return filename;
}

export function print (data : string, dataType : string, outputType : string) : void
{		
    var content : Uint8Array|string = '';
	if 		(dataType === 'base64') {content = base64ToArrayBuffer(data);}
	else if (dataType  === 'blob')   {content = data;}
	
 	const blob = new Blob([content], { type: outputType });
 	const url = window.URL.createObjectURL(blob);
	
	print_(url).then(()=>
	{
		window.URL.revokeObjectURL(url);
	});
}

function print_ (relativeUrl : string) : Promise<boolean>
{		
	return new Promise( (resolve) =>
	{
		let pdfFrame = document.body.appendChild(document.createElement('iframe'));
	    pdfFrame.style.display = 'none';
	    pdfFrame.onload = ( () =>
	    {
			void pdfFrame.contentWindow?.print();
			resolve(true);
		});
	    pdfFrame.src = relativeUrl; 
    });   
}

export function base64ToArrayBuffer (data : string) : Uint8Array
{
    const bString = atob(data);
    const bLength = bString.length;
    let bytes = new Uint8Array(bLength);
    for (let i = 0; i < bLength; i++) {
        const ascii = bString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}

export async function fileExists (url : string) : Promise<boolean>
{	
	return (await fetch(url, {method: "HEAD"})).ok;
}