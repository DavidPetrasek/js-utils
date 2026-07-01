

export function stringTruncate (str: string, length: number, ellipsis : string = '...') : string
{
   if (str.length > length) 
   {
      return str.substring(0, length) + ellipsis;
   }
   return str;
}

export function stringToBool (str: string) : boolean
{
	switch(str?.toLowerCase()?.trim()){
        case "true": 
        case "yes": 
        case "1": 
          return true;

        case "false": 
        case "no": 
        case "0": 
        case null: 
        case undefined:
          return false;

        default: 
          return JSON.parse(str);
    }
}

/**
  * Returns the width of the given text of given font in pixels.
  * 
  * @param {String} text The text to be rendered.
  * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
  * 
  * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
  */
export function stringWidth(text: string, font: string): number
{
    const canvas = (stringWidth as any).canvas || ((stringWidth as any).canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}

export function isString (val : unknown) : boolean
{
  return (typeof val === 'string' || val instanceof String);
}