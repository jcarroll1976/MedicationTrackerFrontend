export interface User {
    username: string;
    password: string;
}

export interface Medication {
    id?: string;
    name: string;
    dosage: string;
    frequency: string;
    refillDate: Date;
    instructions?: string;
    sideEffects?: string[];
}

export interface MedicationArray {
    medications: Medication[]
}

export interface DosagesLog {
    id: string;
    medication: Medication;
    date: Date;
    time?: Date;
}