import { useContext, useEffect, useState } from "react";
import { Medication } from "../models/UserMedication";
import AuthContext from "../context/AuthContext";
import { getUserMedications } from "../services/MedicationServices";
import { Link, Navigate } from "react-router-dom";
import "./DosageLogList.css"

export default function DosageLogList() {
    const [medicationLogs,setMedicationLogs] = useState<Medication[]>([]);
    const {user} = useContext(AuthContext);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=> {
        if(user?.uid) {
            getUserMedications(user.uid).then(data => {
                setMedicationLogs(data);
                setIsLoading(false);
            })
        }
    },[user]);

    if(!user) {
        return <Navigate to="/" />;  
    }

    return (
        <main className="dosage-log-list">
            {isLoading ? (
                <div>
                    <p>Loading...</p>
                </div>
            ) : (
                medicationLogs.length > 0 ? (
            <div>
                <h2>Click on Medication to View Dosage Log</h2>

                <div className="medication-links">
                    {medicationLogs.map((medicationLog) => (
                        <Link to={`/medications/${medicationLog._id}/dosage-log`}><p key={medicationLog._id}>{medicationLog.name.toLowerCase()}</p></Link>
                    ))}
                </div>
            </div>) : (
            medicationLogs.length === 0 && 
            <div className="addButton">
                <p>No Medications Found.</p>
                <Link to={"/add-medication"}><button>Add A Medication</button></Link>
            </div>
            ))}
        </main>
    )
}