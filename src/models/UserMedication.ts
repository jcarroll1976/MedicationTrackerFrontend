export interface User {
    uid: string;
    displayName: string;
    email: string;
}

export interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    refillDate: Date;
    instructions?: string;
    sideEffects?: string[];
}

export interface MedicationArray {
    id:string;
    medications: Medication[]
}

export interface DosagesLog {
    id?: string;
    medication: Medication;
    date: Date;
    time?: Date;
}