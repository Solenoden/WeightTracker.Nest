import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { WeightEntryService } from './weight-entry.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WeightEntry } from './models/weight-entry.model';
import { AddWeightEntryRequest } from './models/add-weight-entry-request.model';
import { InsertOneResult } from 'mongodb';
import { UpdateWeightEntryRequest } from './models/update-weight-entry-request.model';

@ApiTags('weight-entry')
@Controller()
export class WeightEntryController {
    constructor(
        private weightEntryService: WeightEntryService
    ) {}

    @Get('get_weight_history')
    @ApiOkResponse({ description: 'Weight entries have successfully been retrieved.' })
    getWeightEntries(@Query('userId') userId: string): Promise<Array<WeightEntry>> {
        return this.weightEntryService.getWeightEntries(userId);
    }

    @Post('save_weight')
    @ApiCreatedResponse({ description: 'The weight entry has been successfully saved.' })
    addWeightEntry(@Body() body: AddWeightEntryRequest): Promise<InsertOneResult> {
        return this.weightEntryService.addWeightEntry(body.userId, body.weight, body.entryDateEpoch);
    }

    @Put('update_weight')
    @ApiOkResponse({ description: 'Weight entry successfully updated.' })
    updateWeightEntry(@Body() body: UpdateWeightEntryRequest): Promise<void> {
        return this.weightEntryService.updateWeightEntry(body.weightEntryId, body.weight);
    }

    @Delete('delete_weight/:weightEntryId')
    @ApiOkResponse({ description: 'Weight entry successfully deleted.' })
    deleteWeightEntry(@Param('weightEntryId') weightEntryId: string): Promise<void> {
        return this.weightEntryService.deleteWeightEntry(weightEntryId);
    }
}
