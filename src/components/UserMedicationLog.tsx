import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom'; // Assuming route fetches medicationId
import { DosagesLog, Medication } from '../models/UserMedication'; // Assuming DosagesLog and Medication interfaces
import { getUserDosageLogById } from '../services/MedicationServices'; // Assuming service functions
import AuthContext from '../context/AuthContext';



function UserMedicationLog() {
  const [dosageLogs, setDosageLogs] = useState<DosagesLog[]>([]);
  const [medication, setMedication] = useState<Medication | null>(null);
  const { user } = useContext(AuthContext); // Access user from context
  const user_id = user?.uid; // Extract user ID
  const { medicationId } = useParams(); // Access medicationId from route


  useEffect(() => {
    /*if (user_id && medicationId) {
      // Fetch medication data first
      getUserMedicationById(user_id, medicationId).then((fetchedMedication) => {
        if (fetchedMedication) {
          console.log(fetchedMedication);
          setMedication(fetchedMedication);
        } else {
          // Handle case where medication is not found (e.g., display an error message)
          console.error("Medication not found");
        }
      })

      // Then fetch dosage logs
      getUserDosageLogById(user_id, medicationId).then((data) => {
        console.log(data)
      //  setDosageLogs(data);
      });
    }*/
    if (medicationId ) {
      getUserDosageLogById(medicationId).then(data => {
        setDosageLogs(data);
      })
    }
  }, [medicationId]);

  if (!user) {
    return <Navigate to="/" />;
}

  return (
    <div>
      {medicationId && (
        <>
          <h2>{medication?.name} Dosage Log</h2>
          {/* Remove AddDosageLog component as you're not adding new logs */}

          {/* Table for existing logs (optional) */}
          {dosageLogs.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {dosageLogs.map((dosageLog) => (
                  <tr key={dosageLog._id}>
                    <td>{new Date(dosageLog.date).toLocaleDateString()}</td>
                    <td>{new Date(dosageLog?.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* Display message if no dosage logs found (optional) */}
          {dosageLogs.length === 0 && medicationId && (
            <p>No dosage logs found for this medication.</p>
          )}
        </>
      )}
    </div>
  );
}

export default UserMedicationLog;
