interface Isubscription{
    name:string,
    limitExport:number,
    saveImageCount:number
}

export default interface IuserDataCookie {
  email: string;
  userName: string;
  _id: string;
  subscriptionType:Isubscription 
}
