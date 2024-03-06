import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async createToken(email: string): Promise<string> {
        const payload = { email };
        return this.jwtService.sign(payload);
    }

    //generateToken ...
}