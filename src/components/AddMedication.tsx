import { FormEvent, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Medication } from "../models/UserMedication";
import { postUserMedication } from "../services/MedicationServices";
import { useNavigate } from "react-router-dom";
import "./AddMedication.css";


interface Props {
    onSubmit: (user_id: string, medication: Medication) => void;
}

export default function AddMedication({onSubmit}:Props) {
    const {user} = useContext(AuthContext);

    const user_id = user?.uid;

    const [name,setName] = useState("");
    const [dosage,setDosage] = useState("");
    const [frequency,setFrequency] = useState("");
    const [refillDate,setRefillDate] = useState("");
    const [instructions,setInstructions] = useState("");
    const [sideEffects,setSideEffects] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        const medication: Medication = {
            user_id: user_id!,
            name,
            dosage,
            frequency,
            refillDate,
            instructions,
            sideEffects
        };
        onSubmit(user_id!,medication);
        navigate("/medications")
        setName("");
        setDosage("");
        setFrequency("");
        setRefillDate(new Date().toString());
        setInstructions("");
        setSideEffects([]);
    };



    if (!user) {
        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit} className="add-medication-form">
            <div className="form-group">
                <label htmlFor="name">Medication Name:</label>
                <input
                    type="text"
                    id="name"
                    required ={true}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
            <label htmlFor="dosage">Dosage:</label>
            <input
                type="text"
                id="dosage"
                required={true}
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
            />
            </div>
            <div className="form-group">
            <label htmlFor="frequency">Frequency:</label>
            <input
                type="text"
                id="frequency"
                required={true}
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
            />
            </div>
            <div className="form-group">
                <label htmlFor="refillDate">Refill Date:</label>
                <p>Click on calendar if medication has refill date.</p>
                <input
                    type="date"
                    id="refillDate"
                    value={refillDate}
                    onChange={(e) => setRefillDate(new Date(e.target.value).toISOString().slice(0,10))}
                />
            </div>
            <div className="form-group">
                <label htmlFor="instructions">Instructions:</label>
                <textarea
                    id="instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    style={{whiteSpace: "pre-wrap"}}
                />
            </div>
            <div className="form-group">
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
                            <button className="remove-side-effect" type="button" onClick={() => setSideEffects(sideEffects.slice(0,index))}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <button className="add-side-effect" type="button" onClick={() => setSideEffects([...sideEffects,""])}>
                        Add Side Effect
                    </button>
                </div>
            </div>
            <button className="add-medication" type="submit">Add Medication</button>
        </form>
    )

}