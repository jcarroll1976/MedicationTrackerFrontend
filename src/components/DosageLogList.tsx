import { useContext, useEffect, useState } from "react";
import { Medication } from "../models/UserMedication";
import AuthContext from "../context/AuthContext";
import { getUserMedications } from "../services/MedicationServices";
import { Link, Navigate } from "react-router-dom";

export default function DosageLogList() {
    const [medicationLogs,setMedicationLogs] = useState<Medication[]>([]);
    const {user} = useContext(AuthContext);

    useEffect(()=> {
        if(user?.uid) {
            getUserMedications(user.uid).then(data => {
                setMedicationLogs(data);
            })
        }
    },[user]);

    if(!user) {
        return <Navigate to="/" />;  
    }

    return (
        <main>
            <h2>Click on Medication to View Dosage Log</h2>
            <div>
                {medicationLogs.map((medicationLog) => (
                    <Link to={`/medications/${medicationLog._id}/dosage-log`}><p key={medicationLog._id}>{medicationLog.name.toLowerCase()}</p></Link>
                ))}
            </div>
        </main>
    )
}