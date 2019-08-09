export class Note {
  data: string;
  uid: string;
  createdBy: string;
  createdAt: Date;
  hasUpdated?: boolean;
  lastUpdatedAt?: Date;
  lastUpdatedBy?: string;

  constructor(data: string, uid?: string, createdBy?: string, createdAt?: Date, hasUpdated?: boolean, lastUpdatedAt?: Date, lastUpdatedBy?: string) {
    this.data = data;
    this.uid = uid;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.hasUpdated = hasUpdated;
    this.lastUpdatedAt = lastUpdatedAt;
    this.lastUpdatedBy = lastUpdatedBy;
  }
}
