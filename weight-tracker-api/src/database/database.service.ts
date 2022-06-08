import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Db, MongoClient } from 'mongodb';

@Injectable()
export class DatabaseService {
    private databaseClient: MongoClient;
    private database: Db;
    private readonly logger = new Logger(DatabaseService.name);

    constructor(
        private configService: ConfigService
    ) {
        void this.connectToDatabase();
    }

    private async connectToDatabase(): Promise<void> {
        if (!this.databaseClient || !this.database) {
            const databaseUrl = this.configService.get<string>('DATABASE_URL');
            const databaseUsername = this.configService.get<string>('DATABASE_USERNAME');
            const databasePassword = this.configService.get<string>('DATABASE_PASSWORD');

            this.databaseClient = new MongoClient(databaseUrl, {
                auth: { username: databaseUsername, password: databasePassword }
            });

            try {
                await this.databaseClient.connect();

                const databaseName = this.configService.get<string>('DATABASE_NAME');
                this.database = this.databaseClient.db(databaseName);

                this.logger.log('Successfully connected to database');
            } catch (error) {
                this.logger.error('Failed to connect to database', error);
            }
        }
    }
}
