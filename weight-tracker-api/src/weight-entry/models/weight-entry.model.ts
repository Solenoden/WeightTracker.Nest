import { ApiProperty } from '@nestjs/swagger';

export class WeightEntry {
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

    public static fromJson(jsonObject: { [key: string]: any }): WeightEntry {
        const weightEntry = new WeightEntry();
        weightEntry.userId = jsonObject.userId;
        weightEntry.weight = jsonObject.weight;
        weightEntry.entryDateEpoch = jsonObject.entryDateEpoch;

        return weightEntry;
    }
}