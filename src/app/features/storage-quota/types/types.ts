import { ReactNode } from 'react';

export interface StorageType {
    type: string;
    used: number;
    color: string;
    bgColor: string;
    icon: ReactNode;
}

export interface MousePosition {
    x: number;
    y: number;
} 