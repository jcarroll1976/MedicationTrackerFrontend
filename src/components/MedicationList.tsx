import { useContext, useEffect, useState } from "react";

//import { medications } from "../medication";
import MedicationModal from "./MedicationModal";
import { Medication, MedicationArray } from "../models/UserMedication";
import AuthContext from "../context/AuthContext";
import { getUserMedications } from "../services/MedicationServices";
import { Link, useParams } from "react-router-dom";
import "./MedicationList.css";
//import "react-modal/dist/Modal.css";

export default function MedicationList() {
    const [medications,setMedications] = useState<Medication[]>([]);
    const {user} = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

    useEffect(() => {
        if (user?.uid) {
            getUserMedications(user.uid).then(data => {
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
            <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Dosage</th>
            <th>Frequency</th>
            <th>Instructions</th>
            <th>Side Effects</th>
          </tr>
        </thead>
        <tbody>
          {medications?.map((medication) => (
            <tr key={medication._id?.toString()}>
              <td>{medication.name}</td>
              <td>{medication.dosage}</td>
              <td>{medication.frequency}</td>
              <td>
                {medication.instructions ? (
                  <button onClick={() => openModal(medication)}>
                    View Instructions
                  </button>
                ) : (
                  "-"
                )}
              </td>
              <td>
                {medication.sideEffects ? (
                  <button onClick={() => openModal(medication)}>
                    View Side Effects
                  </button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <MedicationModal
        isOpen={isOpen}
        closeModal={closeModal}
        title={selectedMedication?.name ? `${selectedMedication.name} Details` : "Medication Details"}
      >
        {selectedMedication?.instructions ? (
          <>
            <h3>Instructions</h3>
            <p>{selectedMedication.instructions}</p>
          </>
        ) : (
          <p>No instructions available.</p>
        )}
        {/* ... similar logic for side effects ... */}
      </MedicationModal>
      <Link to={"/add-medication"}><button>Add A Medication</button></Link>
        </div>
    )
}