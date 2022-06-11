import { Body, Controller, Post } from '@nestjs/common';
import { InsertOneResult } from 'mongodb';
import { AuthenticationService } from './authentication.service';
import { User } from './models/user.model';

@Controller('authentication')
export class AuthenticationController {
    constructor(
        private authenticationService: AuthenticationService
    ) {}

    @Post('sign_up')
    public signUp(@Body() body: User): Promise<InsertOneResult<Document>> {
        return this.authenticationService.registerUser(body)
    }

    @Post('login')
    public login(@Body() body: User): Promise<{ isValid: boolean, token?: string }> {
        return this.authenticationService.loginUser(body.emailAddress, body.hashedPassword)
    }
}
