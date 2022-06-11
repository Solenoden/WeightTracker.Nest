import { Logger, Module, Provider } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { WeightEntryModule } from './weight-entry/weight-entry.module';

const loggerFactory: Provider = {
    provide: Logger,
    useFactory: (): Logger => new Logger('Application')
}

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        AuthenticationModule,
        DatabaseModule,
        WeightEntryModule
    ],
    controllers: [],
    providers: [
        loggerFactory
    ],
})
export class AppModule {
}
