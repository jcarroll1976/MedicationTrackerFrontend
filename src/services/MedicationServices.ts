import axios from "axios";
import { DosagesLog, Medication } from "../models/UserMedication";

export function getUserMedications(user_id:string):Promise<Medication[]> {
    return axios.get(`http://127.0.0.1:5001/health-app-65191/us-central1/api/${user_id}/medications`)
    .then(response => response.data)
}

export function getUserMedicationById(user_id:string,_id:string):Promise<Medication> {
    return axios.get(`http://127.0.0.1:5001/health-app-65191/us-central1/api/${user_id}/medications/${_id}`)
    .then(response => response.data);
}

export function postUserMedication(user_id: string, medication: Medication): Promise<Medication> {
    return axios.post(`http://127.0.0.1:5001/health-app-65191/us-central1/api/${user_id}/medications`,medication)
    .then(response => response.data);
}

export function removeUserMedication(user_id: string, medicationId:string):Promise<void> {
    return axios.delete(`http://127.0.0.1:5001/health-app-65191/us-central1/api/${user_id}/medications/${medicationId}`)
    .then(response => response.data)
}

export function updateUserMedication(user_id: string, id: string, updatedMedication: Medication): Promise<Medication> {
    return axios.put(`http://127.0.0.1:5001/health-app-65191/us-central1/api/${user_id}/medications/${id}`,updatedMedication)
    .then(response => response.data)
}

export function getUserDosageLogs(user_id:string): Promise<DosagesLog[]> {
    return axios.get(`http://127.0.0.1:5001/health-app-65191/us-central1/api/${user_id}/dosageLogs`)
    .then(response => response.data)
}

export function getUserDosageLogById(medicationId:string): Promise<DosagesLog[]> {
    return axios.get(`http://127.0.0.1:5001/health-app-65191/us-central1/api/medications/${medicationId}/dosageLogs`)
    .then(response => response.data)
}

export function postUserDosageLogById(user_id:string,medicationId:string,dosageLog:DosagesLog):Promise<DosagesLog> {
    return axios.post(`http://127.0.0.1:5001/health-app-65191/us-central1/api/${user_id}/medications/${medicationId}/dosageLogs`,dosageLog)
    .then(response => response.data)
}