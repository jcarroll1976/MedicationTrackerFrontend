//import { useState } from "react";

import { medications } from "../medication";

export default function MedicationList() {
    //const [medications,setMedications] = useState([]);

    return (
        <div>
            <ul>
                {medications.map((medication) => (
                    <li key={medication.id}>
                        <div>
                            <span>{medication.name}</span>
                            <span>
                                {medication.dosage}
                                ({medication.frequency})
                            </span>
                            <div>
                                <h3>Refill Date:</h3>
                                {medication.refillDate}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}