export function setToken(value:string){
    sessionStorage.setItem('adminToken',value)
}

export function getToken():string{
   return  sessionStorage.getItem('adminToken')||""
}