export class User {
    name: string;
    surname: string;
    emailAddress: string;
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