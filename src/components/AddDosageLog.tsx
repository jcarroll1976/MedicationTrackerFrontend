import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // For programmatic navigation
import { DosagesLog, Medication } from '../models/UserMedication'; // Assuming DosagesLog interface
import { postUserDosageLogById } from '../services/MedicationServices'; // Assuming service function
import AuthContext from '../context/AuthContext';

interface Props {
  selectedMedication: Medication | null; // Medication ID for which to add dosage log
  onSubmit: (dosageLog: DosagesLog) => void; // Callback for successful submission
}

function AddDosageLog({ selectedMedication, onSubmit }: Props) {
  const { user } = useContext(AuthContext);
  const [notes,setNotes] = useState("");
  const { medicationId } = useParams();
  const user_id = user?.uid;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const today = new Date(); // Capture current date and time

    const dosageLog: DosagesLog = {
      date: today,
      time: today,
      user_id: user_id!,
      medicationId: medicationId!,
      notes: notes,
    };

    try {
      const newDosageLog = await postUserDosageLogById(user_id!, medicationId!, dosageLog);
      onSubmit(newDosageLog); // Call the provided onSubmit callback
    } catch (err) {
      console.error("Error adding dosage log:", err);
      // Handle errors (e.g., display an error message to the user)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Log Dosage</h2>
        <label htmlFor="date">Date:</label>
        <input type="text" id="date" value={new Date().toLocaleDateString()} disabled /> {/* Display current date, disabled as it's captured in handleSubmit */}
        <label htmlFor="time">Time:</label>
        <input type="text" id="time" value={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} disabled /> {/* Display current time, disabled as it's captured in handleSubmit */}
        <label htmlFor="notes">Notes:</label>
        <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        {selectedMedication && (
          <p>
            Adding dosage for medication: <b>{selectedMedication.name}</b>
          </p>
        )}
        <button type="submit">Log Dosage</button>
      </form>
      <Link to = {`/medications/${medicationId}/dosage-log`}><button>Dosage Logs</button></Link>
    </div>
  );
}

export default AddDosageLog;
