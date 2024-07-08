import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { DosagesLog, Medication } from '../models/UserMedication';
import { getUserDosageLogById } from '../services/MedicationServices';
import AuthContext from '../context/AuthContext';

import "./UserMedicationLog.css"



function UserMedicationLog() {
  const [dosageLogs, setDosageLogs] = useState<DosagesLog[]>([]);
  const [medication, setMedication] = useState<Medication | null>(null);
  const { user } = useContext(AuthContext); // Access user from context
  const { medicationId } = useParams();
  const [isLoading,setIsLoading] = useState(true);


  useEffect(() => {
    if (medicationId ) {
      getUserDosageLogById(medicationId).then(data => {
        setDosageLogs(data);
        setIsLoading(false);
      })
    }
  }, [medicationId]);

  if (!user) {
    return <Navigate to="/" />;
}

  return (
    <div className='medication-log'>
      {medicationId && (
        <>
          <h2>{medication?.name} Dosage Log</h2>
          {isLoading ? (
            <div>
              <p>Loading...</p>
            </div>
          ) :
          (dosageLogs.length > 0 && (
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
          ))}
          {dosageLogs.length === 0 && medicationId && (
            <p>No dosage logs found for this medication.</p>
          )}
        </>
      )}
    </div>
  );
}

export default UserMedicationLog;
