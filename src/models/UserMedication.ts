import { ObjectId } from "mongodb";

export interface User {
    uid: string;
    displayName: string;
    email: string;
}

export interface Medication {
    _id?: ObjectId;
    user_id: string;
    name: string
    dosage: string;
    frequency: string;
    refillDate: Date;
    instructions?: string;
    sideEffects?: string[];
}

export interface MedicationArray {
    id:string;
    medications?: Medication[]
}

export interface DosagesLog {
    _id?: ObjectId;
    user_id: string;
    medication: Medication;
    date: Date;
    time?: Date;
}