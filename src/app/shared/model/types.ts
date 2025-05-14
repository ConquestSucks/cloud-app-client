export interface BaseEntity {
    id?: number;
    name: string;
    isDeleted?: boolean;
    createdAt?: string;
    modifiedAt?: string;
    deletedAt?: string;
}