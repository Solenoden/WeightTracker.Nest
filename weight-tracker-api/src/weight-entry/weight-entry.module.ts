import { Module } from '@nestjs/common';
import { WeightEntryService } from './weight-entry.service';
import { WeightEntryController } from './weight-entry.controller';

@Module({
  providers: [WeightEntryService],
  controllers: [WeightEntryController]
})
export class WeightEntryModule {}
