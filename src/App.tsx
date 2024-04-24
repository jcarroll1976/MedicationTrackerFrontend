import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';

import Login from './components/Login';
import MedicationList from './components/MedicationList';
import DosageLog from './components/DosageLog';
import { Medication } from './models/UserMedication';
import AddMedication from './components/AddMedication';
import MedicationDetails from './components/MedicationDetails';

function App() {
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  const handleLogDosage = (date:Date, time?: Date) => {
    console.log("Dosage logged");
  }
  return (
    <div className="App">
      <Login/>
      {/*<MedicationList />*/}
      {/*<MedicationDetails />*/}
      {/*{selectedMedication && (
      <DosageLog medication={selectedMedication} onLogDosage={handleLogDosage} />
      )}*/}
      {/*<AddMedication />*/}
    </div>
  );
}

export default App;
