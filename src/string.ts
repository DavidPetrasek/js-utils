

export function stringTruncate (input: string, length: number, ellipsis : string = '...') : string
{
   if (input.length > length) 
   {
      return input.substring(0, length) + ellipsis;
   }
   return input;
}

export function stringToBool (stringValue: string) : boolean
{
	switch(stringValue?.toLowerCase()?.trim()){
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
          return JSON.parse(stringValue);
    }
}