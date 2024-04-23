export class User {

    email: string;
    password: string;
    session: string;
  

    constructor(email = '' , password = '' ) {
        this.email = email;
        this.password = password;
     
        
    }

}
