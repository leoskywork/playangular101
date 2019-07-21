export class Note {
    uid: string;
    createdBy: string;
    createdAt: Date;
    data: string;
    hasUpdated?: boolean;
    lastUpdatedAt?: Date;
    lastUpdatedBy?: string;
}