import { useContext, useEffect, useState } from "react";

import MedicationModal from "./MedicationModal";
import { Medication } from "../models/UserMedication";
import AuthContext from "../context/AuthContext";
import { getUserMedications } from "../services/MedicationServices";
import { Link } from "react-router-dom";
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

    return (
        <div>
            {/*medications?.length > 0 ? (
                medications.map((medication) => (
                    <div className="medication-div" key={medication._id?.toString()}>
                        <p>{medication?.name}</p>
                        <p>{medication.dosage}</p>
                        <p>{medication.frequency}</p>
                        {medication.instructions ? <textarea>{medication.instructions}</textarea> : ""}
                    </div>
                )) ) : (
                    <h3>No Medications Found</h3>
            )}
                <Link to = {"/add-medication"}><button>Add A Medication</button></Link>*/}
            <h2>Click on Medication name to log medication dosage</h2>
            <table className="medication-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Instructions</th>
            <th>Refill Date</th>
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
                {medication.refillDate ?new Date(medication.refillDate).toLocaleDateString() : "-"}
              <td>
                <RefillReminder medication={medication} />
              </td>
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