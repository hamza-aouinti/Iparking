export class Place {
id:string;
name:string;
attributed:boolean;
reserved:boolean;
park:string;
adminId:string;
code: {
    type: string,
    unique: true
   };
Capteur:[];
lng:string;
lat:string;
  }
