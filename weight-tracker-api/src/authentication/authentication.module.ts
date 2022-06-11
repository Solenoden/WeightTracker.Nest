import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [AuthenticationController],
  providers: [
      AuthenticationService,
      DatabaseService
  ]
})
export class AuthenticationModule {}
