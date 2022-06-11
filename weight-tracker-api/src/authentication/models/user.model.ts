import { ApiProperty } from '@nestjs/swagger';

export class User {
    @ApiProperty({
        type: String,
        description: 'The user\'s first name'
    })
    name: string;

    @ApiProperty({
        type: String,
        description: 'The user\'s surname'
    })
    surname: string;

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

    public static fromJson(jsonObject: { [key: string]: any }): User {
        const user = new User();
        user.name = jsonObject.name;
        user.surname = jsonObject.surname;
        user.emailAddress = jsonObject.emailAddress;
        user.hashedPassword = jsonObject.hashedPassword;

        return user;
    }
}