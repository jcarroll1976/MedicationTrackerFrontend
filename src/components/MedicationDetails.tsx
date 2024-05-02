import { useContext, useEffect, useState } from "react";
import { Medication } from "../models/UserMedication";
import { getUserMedicationById } from "../services/MedicationServices";
import AuthContext from "../context/AuthContext";

interface Props {
    medicationDetails: Medication;
}

export default function MedicationDetails(/*{medicationDetails}:Props*/) {
    const [medication,setMedication] = useState<Medication>();
    const {user} = useContext(AuthContext);

    useEffect(()=> {
        if (user?.uid && medication?._id) {
        getUserMedicationById(user.uid,medication._id).then(data => {
            setMedication(data)
        })
    }
    },[user,medication])
    return (
        <div>
            <h2>Aspirin{/*{medicationDetails.name}*/}</h2>
            <p>Dosage: 10mg tablet{/*medicationDetails.dosage}*/}</p>
            <p>Refill Date: 6/27/24{/*medicationDetails.refillDate.LocaleDateString()}*/}</p>
            {/*{medicationsDetails.instructions && (
            <div>
                <h3>Instuctions</h3>
                <p>Take with water two times a day.{medicationDetails.instructions}</p>
            </div>
            )}*/}
            <div>
                <h3>Instuctions</h3>
                <p>Take with water two times a day.</p>
            </div>
            {/*{medicationDetails.sideEffects && medicationDetails.length > 0 &&
            (
                <div>
                    <h3>Side Effects</h3>
                    <ul>
                        {medicationDetails.sideEffects.map((sideEffect) => (
                            <li key={sideEffect}>{medicationDetails.sideEffect}</li>
                        ))}
                    </ul>
                </div>
                        )}*/}
            <div>
                <h3>Side Effects</h3>
            </div>
        </div>
    )
    
}