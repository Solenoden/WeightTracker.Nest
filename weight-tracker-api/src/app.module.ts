import { Logger, Module, Provider } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

const loggerFactory: Provider = {
    provide: Logger,
    useFactory: (): Logger => new Logger('Application')
}

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        AuthenticationModule,
        DatabaseModule
    ],
    controllers: [],
    providers: [
        loggerFactory
    ],
})
export class AppModule {
}
