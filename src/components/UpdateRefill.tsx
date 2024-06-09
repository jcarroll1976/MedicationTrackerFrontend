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
};

import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { getUserMedicationById } from '../services/MedicationServices'; // Assuming a service to fetch medication
import { Medication } from '../models/UserMedication';
import AuthContext from '../context/AuthContext';

interface UpdateRefillDateProps {
  medicationId: string; // ID of the medication to update
  onSubmit: (medication: Medication) => void; // Function to handle form submission
}

export default function UpdateRefill({ medicationId, onSubmit }: UpdateRefillDateProps) {
  const {user} = useContext(AuthContext);  
  const [medication, setMedication] = useState<Medication | null>(null);
  const [newRefillDate, setNewRefillDate] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (medication) {
      const updatedMedication = {
        ...medication, // Copy existing medication data
        refillDate: newRefillDate, // Update only the refillDate
      };
      console.log(updatedMedication);
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
      const fetchedMedication = await getUserMedicationById(medicationId);
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
}*/

import React, { FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // For navigation and getting route parameters
import { Medication } from '../models/UserMedication';

interface UpdateRefillProps {
  // No longer needed as we'll use useParams
  // medicationId: string; // ID of the medication to update
  onSubmit: (medicationId: string, medication: Medication) => void; // Function to handle form submission
}

export default function UpdateRefill({ onSubmit }: UpdateRefillProps) {
  const { medicationId } = useParams<{ medicationId: string }>(); // Get medication ID from route parameters
  const [newRefillDate, setNewRefillDate] = useState<string>('');
  const [medication,setMedication] = useState<Medication>();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (medicationId && newRefillDate) { // Ensure both ID and date are available
      const updatedMedication = {
        // Assuming you have a way to fetch medication details (if needed)
        // ...existingMedicationData, // Uncomment if fetching medication data
        ...medication!,
        refillDate: newRefillDate,
      };
      const id = medicationId
      console.log(id);
      onSubmit(medicationId,updatedMedication); // Pass updated medication for submission
      setNewRefillDate(''); // Clear form after submission
      navigate('/medications'); // Navigate back to medication list after update
    } else {
      console.error('Error updating medication: Missing medication ID or refill date.');
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRefillDate (event.target.value);
  };

  return (
    <div>
      <h2>Update Refill Date</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-refill-date">
          New Refill Date:
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
  );
}
