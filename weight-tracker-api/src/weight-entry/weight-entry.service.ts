import { Injectable } from '@nestjs/common';
import { CollectionName, DatabaseService } from '../database/database.service';
import { Collection, InsertOneResult } from 'mongodb';
import { WeightEntry } from './models/weight-entry.model';

@Injectable()
export class WeightEntryService {
    private _weightEntryCollection: Collection;
    private get weightEntryCollection(): Collection {
        if (!this._weightEntryCollection)  {
            this.weightEntryCollection = this.databaseService.getCollection(CollectionName.User);
        }

        return this._weightEntryCollection;
    }
    private set weightEntryCollection(value: Collection) {
        this._weightEntryCollection = value;
    }

    constructor(
        private databaseService: DatabaseService
    ) {}

    public async getWeightEntries(userId: string): Promise<Array<WeightEntry>> {
        const weightEntries = await this.weightEntryCollection.find({ userId }).toArray();
        return weightEntries.map(weightEntry => WeightEntry.fromJson(weightEntry));
    }

    public addWeightEntry(userId: string, weight: number, entryDateEpoch: number): Promise<InsertOneResult> {
        return this.weightEntryCollection.insertOne({ userId, weight, entryDateEpoch });
    }

    public async deleteWeightEntry(userId: string): Promise<Array<WeightEntry>> {
        const weightEntries = await this.weightEntryCollection.find({ userId }).toArray();
        return weightEntries.map(weightEntry => WeightEntry.fromJson(weightEntry))
    }
}
