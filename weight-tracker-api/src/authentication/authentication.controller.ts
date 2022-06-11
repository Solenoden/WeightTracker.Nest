import { Body, Controller, Post } from '@nestjs/common';
import { InsertOneResult } from 'mongodb';
import { AuthenticationService } from './authentication.service';
import { User } from './models/user.model';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserRequest } from './models/login-user-request.model';

@ApiTags('authentication')
@Controller()
export class AuthenticationController {
    constructor(
        private authenticationService: AuthenticationService
    ) {}

    @Post('sign_up')
    @ApiCreatedResponse({ description: 'The new user has successfully been registered.' })
    public signUp(@Body() body: User): Promise<InsertOneResult<Document>> {
        return this.authenticationService.registerUser(body);
    }

    @Post('login')
    @ApiOkResponse({ description: 'The user has been verified and logged in.' })
    @ApiForbiddenResponse({ description: 'Invalid login credentials.' })
    public login(@Body() body: LoginUserRequest): Promise<{ isValid: boolean, token?: string }> {
        return this.authenticationService.loginUser(body.emailAddress, body.hashedPassword);
    }
}
