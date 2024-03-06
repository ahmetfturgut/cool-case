import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor() { }

    async checkUser(email: string, password: string): Promise<boolean> {
        //check userState 
        //check password

        if (email != "test@example.com" || password != "correctpassword") {
            return false;
        }

        return true;
    }
}