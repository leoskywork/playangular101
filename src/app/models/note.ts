export class Note {
    uid: string;
    userId: string;
    createdAt: Date;
    data: string;
    hasUpdated?: boolean;
    lastUpdatedAt?: Date;
    lastUpdatedBy?: string;
}