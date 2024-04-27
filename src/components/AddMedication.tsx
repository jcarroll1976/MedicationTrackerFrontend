import { FormEvent, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Medication } from "../models/UserMedication";
//import { postUserMedication } from "../services/MedicationServices";

interface Props {
    onSubmit: (user_id: string, medication: Medication) => void;
}

export default function AddMedication({onSubmit}:Props) {
    const {user} = useContext(AuthContext);

    const user_id = user!.uid;

    const [name,setName] = useState("");
    const [dosage,setDosage] = useState("");
    const [frequency,setFrequency] = useState("");
    const [refillDate,setRefillDate] = useState(new Date());
    const [instructions,setInstructions] = useState("");
    const [sideEffects,setSideEffects] = useState<string[]>([]);

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        const medication: Medication = {
            id: user_id,
            name,
            dosage,
            frequency,
            refillDate,
            instructions,
            sideEffects
        };
        onSubmit(user_id,medication);
        setName("");
        setDosage("");
        setFrequency("");
        setRefillDate(new Date());
        setInstructions("");
        setSideEffects([]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Medication Name:</label>
            <input
                type="text"
                id="name"
                required ={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="dosage">Dosage:</label>
            <input
                type="text"
                id="dosage"
                required={true}
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
            />
            <label htmlFor="frequency">Frequency:</label>
            <input
                type="text"
                id="frequency"
                required={true}
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
            />
            <label htmlFor="refillDate">Refill Date:</label>
            <input
                type="date"
                id="refillDate"
                required={true}
                value={refillDate.toISOString().substring(0,10)}
                onChange={(e) => setRefillDate(new Date(e.target.value))}
            />
            <label htmlFor="instructions">Instructions:</label>
            <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
            />
            <label htmlFor="sideEffects">Side Effects:</label>
            <div>
                {sideEffects.map((sideEffect,index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={sideEffect}
                            onChange={(e) => {
                                const newSideEffects = [...sideEffects];
                                newSideEffects[index] = e.target.value
                                setSideEffects(newSideEffects)
                            }}
                        />
                        <button type="button" onClick={() => setSideEffects(sideEffects.slice(0,index))}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => setSideEffects([...sideEffects,""])}>
                    Add Side Effect
                </button>
            </div>
            <button type="submit">Add Medication</button>
        </form>
    )

}