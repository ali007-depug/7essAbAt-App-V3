export function addDataToLocalStorage<T>(dataName:string,data:T):void{
    localStorage.setItem(dataName,JSON.stringify(data))
}

export function getDataFromLocalStorage<T>(dataName:string):T | null{
    const data = localStorage.getItem(dataName);
    return data ? JSON.parse(data) : null
}