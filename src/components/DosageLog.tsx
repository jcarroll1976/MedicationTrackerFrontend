import { useState } from "react";
import { Medication } from "../models/UserMedication";

interface Props {
    medication: Medication;
    onLogDosage: (date: Date, time?: Date) => void;
}

export default function DosageLog({medication,onLogDosage}:Props) {
    const [date,setDate] = useState(new Date());
    const [time,setTime] = useState<Date | undefined>()

    function handleLogDosage() {
        onLogDosage(date, time);
    };

    return (
        <div>
            <h2>{medication.name}</h2>
            <label htmlFor="date">Date:</label>
            <input 
                type="date" 
                id="date"
                value={date.toISOString().substring(0,10)}
                onChange={(e) => setDate(new Date(e.target.value))}
            />
            <label htmlFor="time">Time:</label>
            <input
                type="time"
                id="time"
                value={time?.toISOString().substring(11,16)}
                onChange={(e) => setTime(new Date(e.target.value))}
            />
            <button 
                type="button"
                onClick={handleLogDosage}
            >
                Log Dosage
            </button>
        </div>
    );

}