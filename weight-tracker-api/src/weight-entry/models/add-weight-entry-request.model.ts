import { ApiProperty } from '@nestjs/swagger';

export class AddWeightEntryRequest {
    @ApiProperty({
        type: String,
        description: 'The object id of the related user'
    })
    userId: string;

    @ApiProperty({
        type: Number,
        description: 'The captured weight/mass in kilograms'
    })
    weight: number;

    @ApiProperty({
        type: Number,
        description: 'The date of entry in epoch format'
    })
    entryDateEpoch: number;
}