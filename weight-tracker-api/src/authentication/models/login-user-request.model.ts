import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
    @ApiProperty({
        type: String,
        description: 'The user\'s email address'
    })
    emailAddress: string;

    @ApiProperty({
        type: String,
        description: 'The user\'s password in a hashed format'
    })
    hashedPassword: string;
}