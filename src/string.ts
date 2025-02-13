

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