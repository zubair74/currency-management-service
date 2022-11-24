import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('authentication')
export class AuthenticationController {

    constructor(private authenticationService: AuthenticationService){}
  
    @UseGuards(AuthGuard ('local'))
    @Post('login')
    async login(@Body() auth: any) {
        return this.authenticationService.loginWithCredentials(auth);
    }

}
