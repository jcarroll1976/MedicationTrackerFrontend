import { useContext, useEffect, useState } from "react";

//import { medications } from "../medication";
import { Medication, MedicationArray } from "../models/UserMedication";
import AuthContext from "../context/AuthContext";
import { getUserMedications } from "../services/MedicationServices";
import { Link, useParams } from "react-router-dom";
import "./MedicationList.css"

export default function MedicationList() {
    const [medications,setMedications] = useState<Medication[]>([]);
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
            {medications?.map((medication) => (
                <div className="medication-div" key={medication._id?.toString()}>
                    <p>{medication.name}</p>
                    <Link to = {"/medication-details/_id"}><button>Click for details</button></Link>
                    {/*<p>{medication.dosage}</p>
                    <p>{medication.frequency}</p>
            {medication.instructions ? <textarea>{medication.instructions}</textarea> : ""}*/}

                </div>
            ))}
            <Link to = {"/add-medication"}><button>Add A Medication</button></Link>
        </div>
    )
}