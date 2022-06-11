import { Injectable } from '@nestjs/common';
import { CollectionName, DatabaseService } from '../database/database.service';
import { Collection, Document, InsertOneResult, WithId } from 'mongodb';
import { User } from './models/user.model';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationService {
    private _userCollection: Collection;
    private get userCollection(): Collection {
        if (!this._userCollection)  {
            this.userCollection = this.databaseService.getCollection(CollectionName.User);
        }

        return this._userCollection;
    }
    private set userCollection(value: Collection) {
        this._userCollection = value;
    }

    constructor(
        private databaseService: DatabaseService,
        private configService: ConfigService
    ) {}

    public registerUser(user: User): Promise<InsertOneResult<Document>> {
        return this.userCollection.insertOne(user);
    }

    public async loginUser(emailAddress: string, hashedPassword: string): Promise<{ isValid: boolean, token?: string }> {
        const user = await this.getUserByEmailAddress(emailAddress);
        if (user && user.hashedPassword === hashedPassword) {
            const token = this.generateAuthenticationToken();

            return {
                isValid: true,
                token
            };
        }

        return { isValid: false };
    }

    public async getUserByEmailAddress(emailAddress: string): Promise<User> {
        const userRecord: WithId<Document> = await this.userCollection.findOne({ emailAddress });
        return User.fromJson(userRecord);
    }

    private generateAuthenticationToken(): string {
        const secret = this.configService.get<string>('API_SECRET');
        return jwt.sign(
            {},
            secret,
            { expiresIn: '1h' }
        );
    }
}
