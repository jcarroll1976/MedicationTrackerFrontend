import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';

//import SignUpForm from './components/SignUpForm';
import MedicationList from './components/MedicationList';
import DosageLog from './components/DosageLog';
import { Medication } from './models/UserMedication';

function App() {
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  const handleLogDosage = (date:Date, time?: Date) => {
    console.log("Dosage logged");
  }
  return (
    <div className="App">
      <MedicationList />
      {selectedMedication && (
      <DosageLog medication={selectedMedication} onLogDosage={handleLogDosage} />
      )}
    </div>
  );
}

export default App;
