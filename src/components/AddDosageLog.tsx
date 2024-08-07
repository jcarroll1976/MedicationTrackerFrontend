import React, { useContext, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom'; // For programmatic navigation

import "./AddDosageLog.css";
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
      date: today.toISOString(),
      time: today.toISOString(),
      user_id: user_id!,
      medicationId: medicationId!,
      name: selectedMedication?.name,
      notes: notes,
    };

    try {
      const newDosageLog = await postUserDosageLogById(user_id!, medicationId!, dosageLog);
      onSubmit(newDosageLog); // Call the provided onSubmit callback
    } catch (err) {
      console.error("Error adding dosage log:", err);
      // Handle errors (e.g., display an error message to the user)
    }
    <Navigate to = "/medications" />
  };

  if (!user) {
    return <Navigate to="/" />;
}

  return (
    <div className='add-dosage-log'>
      <form className='add-dosage-form' onSubmit={handleSubmit}>
        <h2>Log Dosage</h2>
        <div className='form-group'>
        <label htmlFor="date">Date:</label>
        <input type="text" id="date" value={new Date().toLocaleDateString()} disabled /> {/* Display current date, disabled as it's captured in handleSubmit */}
        </div>
        <div className='form-group'>
        <label htmlFor="time">Time:</label>
        <input type="text" id="time" value={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} disabled /> {/* Display current time, disabled as it's captured in handleSubmit */}
        </div>
        <div className='form-group'>
        <label htmlFor="notes">Notes:</label>
        <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        {selectedMedication && (
          <p>
            Adding dosage for medication: <b>{selectedMedication.name}</b>
          </p>
        )}
        <button className='submit-button' type="submit">Log Dosage</button>
      </form>
      <Link to = {`/medications/${medicationId}/dosage-log`}><button className='log-button'>Dosage Log</button></Link>
    </div>
  );
}

export default AddDosageLog;
