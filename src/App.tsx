import React, { useContext, useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Login from './components/Login';
import MedicationList from './components/MedicationList';
import DosageLog from './components/DosageLog';
import { Medication } from './models/UserMedication';
import AddMedication from './components/AddMedication';
import MedicationDetails from './components/MedicationDetails';
import { postUserMedication } from './services/MedicationServices';
import AuthContext from './context/AuthContext';
import Home from './components/Homepage';
import Navbar from './components/Navbar';

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
      <Router>
        <div className='headerDiv'>
          <Navbar />
        </div>
        
      <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path="/medications" element={<MedicationList />} />
          <Route path="/add-medication" element={<AddMedication onSubmit={(user_id: string,medication:Medication) => submitHandler(user_id!,medication)} />} />
      {/*<MedicationDetails />
      {selectedMedication && (
      <DosageLog medication={selectedMedication} onLogDosage={handleLogDosage} />
      )}*/}

        </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
