export const addUuid = (obj: { [x: string]: any; })=>{
    for (const key in obj){
        if(typeof obj[key] === "array" &&
            Array.isArray(obj[key]) === false){
            recursiveFunction(obj[key])
        }
        else{
            result ={...result, [key] : obj[key] }
        }
    }
}
recursiveFunction(object);
return result;
