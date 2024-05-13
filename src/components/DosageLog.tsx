import { useContext, useState } from "react";
import { DosagesLog, Medication } from "../models/UserMedication";
import AuthContext from "../context/AuthContext";
import "./DosageLog.css"

interface Props {
  medication: Medication;
  onLogDosage: (dosageLog: DosagesLog) => void;
}

export default function DosageLog({ medication, onLogDosage }: Props) {
    const {user} = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState<Date | undefined>();

  function handleLogDosage() {
    // Create a dosage log object
    const dosageLog = {
      date,
      time,
      medicationId: medication?._id || "", // Assuming medication has an ID property
      user_id: user!.uid, // Use user?.uid for optional chaining
    };

    // Call the onLogDosage function with the dosageLog object
    onLogDosage(dosageLog);
  }

  return (
    <div>
      <h2>{medication.name}</h2>
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        value={date.toISOString().substring(0, 10)}
        onChange={(e) => setDate(new Date(e.target.value))}
      />
      <label htmlFor="time">Time:</label>
      <input
        type="time"
        id="time"
        value={time?.toISOString().substring(11, 16)}
        onChange={(e) => setTime(new Date(e.target.value))}
      />
      <button type="button" onClick={handleLogDosage}>
        Log Dosage
      </button>
    </div>
  );
}
