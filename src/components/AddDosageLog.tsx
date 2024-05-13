import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // For programmatic navigation
import { DosagesLog } from '../models/UserMedication'; // Assuming DosagesLog interface
import { postUserDosageLogById } from '../services/MedicationServices'; // Assuming service function
import AuthContext from '../context/AuthContext';

interface Props {
  medicationId: string; // Medication ID for which to add dosage log
  onSubmit: (dosageLog: DosagesLog) => void; // Callback for successful submission
}

function AddDosageLog(/*{ onSubmit }: Props*/) {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [notes, setNotes] = useState('');
  const {user} = useContext(AuthContext);
  const {medicationId} = useParams();
  const user_id = user?.uid;

  console.log(medicationId);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dosageLog: DosagesLog = {
      date: date!,
      time: time!,
      user_id: user_id!,
      medicationId: medicationId! 
    };

    try {
      const newDosageLog = await postUserDosageLogById(user_id!, medicationId!, dosageLog);
      //onSubmit(newDosageLog); // Call the provided onSubmit callback
    } catch (err) {
      console.error("Error adding dosage log:", err);
      // Handle errors (e.g., display an error message to the user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Dosage Log</h2>
      <label htmlFor="date">Date:</label>
      <input type="date" id="date" value={date?.toISOString().split('T')[0]} onChange={(e) => setDate(new Date(e.target.value))} />
      <label htmlFor="time">Time:</label>
      <input type="time" id="time" value={time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} onChange={(e) => setTime(new Date(e.target.value))} />
      <label htmlFor="notes">Notes:</label>
      <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button type="submit">Log Dosage</button>
    </form>
  );
}

export default AddDosageLog;
