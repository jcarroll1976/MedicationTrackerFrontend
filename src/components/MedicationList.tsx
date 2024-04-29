import { useContext, useEffect, useState } from "react";

//import { medications } from "../medication";
import { Medication, MedicationArray } from "../models/UserMedication";
import AuthContext from "../context/AuthContext";
import { getUserMedications } from "../services/MedicationServices";

export default function MedicationList() {
    const [medications,setMedications] = useState<MedicationArray>();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        if (user?.uid) {
            getUserMedications(user.uid).then(data => {
                setMedications(data)
            })
        }
    },[user])
    return (
        <div>
            <ul>
                {medications?.medications.map((medication) => (
                    <li key={medication.id}>
                        <div>
                            <p>{medication.name}</p>
                            <span>
                                {medication.dosage}
                                ({medication.frequency})
                            </span>
                            <div>
                                <h3>Refill Date:</h3>
                                {medication.refillDate.toLocaleDateString()}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}