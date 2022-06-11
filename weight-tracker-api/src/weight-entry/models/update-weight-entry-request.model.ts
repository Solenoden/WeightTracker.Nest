import { ApiProperty } from '@nestjs/swagger';

export class UpdateWeightEntryRequest {
    @ApiProperty({
        type: String,
        description: 'The object id of the weight entry'
    })
    weightEntryId: string;

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
}