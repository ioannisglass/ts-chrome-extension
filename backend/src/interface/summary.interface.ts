import { Document } from 'mongoose';
export interface ISummary extends Document{
    hText: string;
    sText: string;
    date: Date;
}