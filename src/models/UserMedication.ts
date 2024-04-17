export interface User {
    username: string;
    password: string;
}

export interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    refillDate: Date;
}

export interface MedicationArray {
    medications: Medication[]
}