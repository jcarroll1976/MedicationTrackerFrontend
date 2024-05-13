export interface User {
    uid: string;
    displayName: string;
    email: string;
}

export interface Medication {
    _id?: string;
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
    _id?: string;
    user_id: string;
    medicationId: string;
    name?: string;
    date: Date;
    time?: Date;
    notes?: string;
}