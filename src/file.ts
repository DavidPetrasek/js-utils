export function print(data : string, dataType : 'base64'|'blob', mimeType : string = '') : void
{       
    let content : Uint8Array | string = '';
    if      (dataType === 'base64') { content = base64ToArrayBuffer(data); }
    else if (dataType === 'blob')   { content = data; }
    
    // Using 'as any' bypasses the rigid SharedArrayBuffer compiler mismatch
    const blob = new Blob([content as any], {type: mimeType});
    const url = window.URL.createObjectURL(blob);
    
    print_(url).then(()=>
    {
        window.URL.revokeObjectURL(url);
    });
}

function print_(relativeUrl : string) : Promise<boolean>
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

export function blobToBase64(blob : Blob) : Promise<string>
{
    return new Promise((resolve, reject) =>
    {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => 
            {
                var base64data = reader.result;
                if (typeof base64data === 'string') {resolve(base64data);}
                else                                {resolve('');}
            }
        reader.onerror = error => reject(error);
    })
}

/**
 * @deprecated Asynchronous signature returning Promise<void> will become synchronous (returning void) in v3.0.0
 */
export async function downloadStream(data: string, headers: Headers) : Promise<void>
{
    const contentDisposition = headers.get('content-disposition');
    const filename = contentDispositionGetFileName(contentDisposition ?? '');
    const mimeType = headers.get('content-type') ?? 'application/octet-stream';

    const blob = new Blob([data], { type: mimeType });
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Delay for safe memory release
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100);
}

function contentDispositionGetFileName(contentDisposition : string) : string
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

export function base64ToArrayBuffer(data : string) : Uint8Array
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

export async function fileExists(url : string) : Promise<boolean>
{	
	return (await fetch(url, {method: "HEAD"})).ok;
}