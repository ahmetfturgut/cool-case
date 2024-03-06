import { Controller, Post, Body } from '@nestjs/common';
import { LoginRequestDto } from './dto/user.request.dto';
import { LoginResponseDto } from './dto/user.response.dto';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
    constructor(
        private authService: AuthService,
        private userService: UserService

    ) { }

    @Post('login')
    async login(@Body() request: LoginRequestDto): Promise<LoginResponseDto> {
        let checkUser = await this.userService.checkUser(request.email, request.password)
        //log start 
        if (!checkUser) {
            //err log
            throw new Error('Unauthorized');
        }

        const accessToken = await this.authService.createToken(request.email);

        let response = new LoginResponseDto()
        response.accessToken = accessToken
        //log end 
        return response;
    }
}
