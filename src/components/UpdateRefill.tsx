/*import React, { FormEvent, useState } from 'react';

interface UpdateRefillDateProps {
  medicationId: string; // ID of the medication to update
  onSubmit: (medicationId: string, newRefillDate: string) => void; // Function to handle form submission
}

export default function UpdateRefillDate({ medicationId, onSubmit }: UpdateRefillDateProps) {
  const [newRefillDate, setNewRefillDate] = useState<string>('');


  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    onSubmit(medicationId, newRefillDate);
    setNewRefillDate(''); // Clear form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-refill-date">
        New Refill Date:
        <input
          type="date"
          id="new-refill-date"
          value={newRefillDate}
          onChange={(e) => setNewRefillDate(new Date(e.target.value).toString())}
          required
        />
      </label>
      <button type="submit">Update Refill Date</button>
    </form>
  );
};*/

import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { getUserMedicationById } from '../services/MedicationServices'; // Assuming a service to fetch medication
import { Medication } from '../models/UserMedication';
import AuthContext from '../context/AuthContext';
import { useParams } from 'react-router-dom';

interface UpdateRefillDateProps {
  selectedMedication: Medication | null; // ID of the medication to update
  onSubmit: (medication: Medication) => void; // Function to handle form submission
}

export default function UpdateRefill({ selectedMedication, onSubmit }: UpdateRefillDateProps) {
  const {user} = useContext(AuthContext);  
  const [medication, setMedication] = useState<Medication | null>(null);
  const [newRefillDate, setNewRefillDate] = useState<string>('');
  const {medicationId} = useParams();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (medication) {
      const updatedMedication = {
        ...medication, // Copy existing medication data
        refillDate: newRefillDate, // Update only the refillDate
      };
      onSubmit(updatedMedication); // Pass updated medication for submission
      setNewRefillDate(''); // Clear form after submission
    } else {
      console.error('Medication data not available for update.');
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRefillDate(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMedication = await getUserMedicationById(medicationId!);
      setMedication(fetchedMedication);
    };

    if (medicationId) {
      fetchData();
    }
  }, [medicationId]);

  return (
    <div>
    {medication ? (
      <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-refill-date">
          New Refill Date for {medication.name}:
          <input
            type="date"
            id="new-refill-date"
            value={newRefillDate}
            onChange={handleDateChange}
            required
          />
        </label>
        <button type="submit">Update Refill Date</button>
      </form>
      </div>
    ) : (
      <p>Loading medication details...</p>
    )}
  </div>
  );
}

