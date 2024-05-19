/*import React, { createContext, useState } from 'react';

interface Medication {
  // Replace with the structure of your medication data (name, dosage, frequency, etc.)
  id: string; // Unique identifier for the medication
  name: string;
  dosage: string;
  frequency: string;
  instructions?: string; // Optional instructions for the medication
  sideEffects?: string | string[]; // Optional side effects (string or array of strings)
  refillDate?: Date; // Optional refill date for the medication
  dosageLogs?: DosageLog[]; // Optional array of dosage logs for this medication
}

interface DosageLog {
  // Structure of your dosage log data (date, time, notes, etc.)
  date: Date;
  time: string;
  notes?: string;
}

const MedicationContext = createContext<Medication | null>(null);

const MedicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  // Function to add a new dosage log (assuming you have logic for persistence)
  const addDosageLog = (medicationId: string, dosageLog: DosageLog) => {
    if (!selectedMedication || selectedMedication.id !== medicationId) return;

    const updatedMedication = {
      ...selectedMedication,
      dosageLogs: selectedMedication.dosageLogs ? [...selectedMedication.dosageLogs, dosageLog] : [dosageLog],
    };
    setSelectedMedication(updatedMedication);
  };

  // Function to remove a medication by ID (assuming backend interaction)
  const removeMedication = async (medicationId: string) => {
    // Implement logic to remove medication from user's data (e.g., API call)
    // Update local state if necessary based on removal success
  };

  return (
    <MedicationContext.Provider value={{ selectedMedication, setSelectedMedication, addDosageLog, removeMedication }}>
      {children}
    </MedicationContext.Provider>
  );
};

export { MedicationContext, MedicationProvider };*/
