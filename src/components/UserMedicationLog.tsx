import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import { useParams } from 'react-router-dom'; // Assuming route fetches medicationId
import { DosagesLog, Medication } from '../models/UserMedication'; // Assuming DosagesLog and Medication interfaces
import { getUserMedicationById, getUserDosageLogById, postUserDosageLogById } from '../services/MedicationServices'; // Assuming service functions
import AddDosageLog from './AddDosageLog'; // Assuming AddDosageLog component
import AuthContext from '../context/AuthContext';

interface Props {
  // No props needed as medicationId is fetched from route
}

function UserMedicationLog() {
  const [dosageLogs, setDosageLogs] = useState<DosagesLog[]>([]);
  const [medication, setMedication] = useState<Medication | null>(null);
  const { user } = useContext(AuthContext); // Access user from context
  const user_id = user?.uid; // Extract user ID
  const navigate = useNavigate(); // Get navigate function
  const { medicationId } = useParams(); // Access medicationId from route

  useEffect(() => {
    if (user_id && medicationId) {
      //fetch medication data first
      getUserMedicationById(user_id, medicationId).then(fetchedMedication => {
        if (fetchedMedication) {
          console.log(fetchedMedication);
          setMedication(fetchedMedication);
        } else {
          // Handle case where medication is not found (e.g., display error message)
          console.error("Medication not found");
        }
      });
      // Then fetch dosage logs
      getUserDosageLogById(user_id, medicationId).then(data => {
        setDosageLogs(data);
      });
    }
  }, [user_id, medicationId]);

  const handleAddDosageLog = async (dosageLog: DosagesLog) => {
    try {
      // Assuming medication is fetched and available
      if (!medication) {
        console.error("Medication data unavailable for adding dosage log");
        return;
      }

      const newDosageLog = await postUserDosageLogById(user_id!, medicationId!, dosageLog);
      setDosageLogs([...dosageLogs, newDosageLog]);
      navigate(`/medication/${medicationId}`); // Redirect after successful addition
    } catch (err) {
      console.error("Error adding dosage log:", err);
      // Handle errors (e.g., display an error message to the user)
    }
  };

  return (
    <div>
      {medicationId && (
        <>
          <h2>{medication?.name} Dosage Logs</h2>
          {/* Conditionally render AddDosageLog component */}
          {medication ? (
            <AddDosageLog medicationId={medicationId} onSubmit={handleAddDosageLog} />
          ) : (
            <p>Loading medication data...</p>
          )}
          {/* Table for existing logs (optional) */}
          {dosageLogs.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {dosageLogs.map((dosageLog) => (
                  <tr key={dosageLog.id}>
                    <td>{dosageLog.date.toLocaleDateString()}</td>
                    <td>{dosageLog?.time?.toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default UserMedicationLog;

