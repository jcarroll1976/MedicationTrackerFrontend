import { useContext, useEffect, useState } from "react";
import moment from "moment";

import MedicationModal from "./MedicationModal";
import { Medication } from "../models/UserMedication";
import AuthContext from "../context/AuthContext";
import { getUserMedications, removeUserMedication } from "../services/MedicationServices";
import { Link, Navigate } from "react-router-dom";
import "./MedicationList.css";
import RefillReminder from "./RefillReminder";

export default function MedicationList() {
    const [medications,setMedications] = useState<Medication[]>([]);
    const {user} = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

    useEffect(() => {
        if (user?.uid) {
            getUserMedications(user.uid).then(data => {
              console.log(data);
                setMedications(data)
            })
        }
    },[user])

    const openModal = (medication: Medication) => {
        setSelectedMedication(medication);
        setIsOpen(true);
      };
    
      const closeModal = () => {
        setIsOpen(false);
        setSelectedMedication(null);
      };

      const handleRemoveMedication = async (medicationId: string) => {
        const user_id = user?.uid
      
          // Call the provided function for backend interaction
          await removeUserMedication(user_id!, medicationId);
      
          const updatedMedications = medications.filter((medication) => medication._id !== medicationId);
          setMedications(updatedMedications);
      
          // Call the prop function to notify the parent component (optional)
          
      };
      
      if (!user) {
        return <Navigate to="/" />;
    }
    
    return (
        <div>
            <h2>Click on medication name to log dosage</h2>
            <table className="medication-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Instructions</th>
            <th>Refill Date</th>
            <th>Refill Reminder</th>
          </tr>
        </thead>
        <tbody>
          {medications?.map((medication) => (
            <tr key={medication._id}>
              <Link to={`/medications/${medication._id}/add-dosage`}><td>{medication.name.toUpperCase()}</td></Link>
              <td>{medication.dosage}</td>
              <td>{medication.frequency}</td>
              <td>
                {medication.instructions || medication.sideEffects ? (
                  <button onClick={() => openModal(medication)}>
                    Click for Instructions/Side Effects
                  </button>
                ) : (
                  "-"
                )}
              </td>
              <td>
                {medication.refillDate ? (moment(medication.refillDate).format('MM/DD/YYYY')) : "N/A"}
                <Link to={`/medications/${medication._id}/update-refill`}><button>Click to Update</button></Link>
              </td>
              <td>
                <RefillReminder medication={medication} />
              </td>
              <td>
                <button onClick={() => handleRemoveMedication(medication._id!)}>
                  Remove Medication
                </button>
              </td>
            </tr> 
          ))}
        </tbody>
        </table>
      <MedicationModal
        isOpen={isOpen}
        closeModal={closeModal}
        title={selectedMedication?.name ? `${selectedMedication.name.toUpperCase()} Details` : "Medication Details"}
        selectedMedication={selectedMedication}
      >
        {selectedMedication?.instructions ? (
          <>
            <h3>Instructions</h3>
            <p>{selectedMedication.instructions}</p>
          </>
        ) : (
          <p>No instructions available.</p>
        )}
       {selectedMedication?.sideEffects ? (
          <>
            <h3>Side Effects</h3>
            {/* Assuming sideEffects is a string or array of strings */}
            <p>{selectedMedication.sideEffects}</p>
            {/* You can modify this to display side effects in a list if it's an array */}
          </>
        ) : (
          <p>No side effects listed.</p>
        )}
      </MedicationModal>
      <Link to={"/add-medication"}><button>Add A Medication</button></Link>
        </div>
    )
}