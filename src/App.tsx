import React, { useContext, useState } from 'react';
//import logo from './logo.svg';
import './App.css';

import Login from './components/Login';
import MedicationList from './components/MedicationList';
import DosageLog from './components/DosageLog';
import { Medication } from './models/UserMedication';
import AddMedication from './components/AddMedication';
import MedicationDetails from './components/MedicationDetails';
import { postUserMedication } from './services/MedicationServices';
import AuthContext from './context/AuthContext';

function App() {
  const {user} = useContext(AuthContext);

  const user_id = user?.uid;

  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

  const handleLogDosage = (date:Date, time?: Date) => {
    console.log("Dosage logged");
  }

  function submitHandler(user_id:string,medication: Medication) {
    postUserMedication(user_id!, medication)
  };
  
  return (
    <div className="App">
      <Login/>
      {/*<MedicationList />
      <MedicationDetails />
      {/*{selectedMedication && (
      <DosageLog medication={selectedMedication} onLogDosage={handleLogDosage} />
      )}}
      {user ?<AddMedication onSubmit={(user_id: string,medication:Medication) => submitHandler(user_id!,medication)} /> : ("")}*/}
    </div>
  );
}

export default App;
