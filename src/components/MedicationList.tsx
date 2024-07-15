import { useContext, useEffect, useState } from "react";
import moment from "moment";


import CustomModal from "./MedicationModal";
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user?.uid) {
            getUserMedications(user.uid).then(data => {
                console.log(data);
                setMedications(data);
                setIsLoading(false);
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
          {isLoading ? (
            <div className="loading-message">
              <p>Loading Medications...</p>
            </div>
          ) : (
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
          {medications.length > 0 ? (
          <tbody>
            {medications?.map((medication) => (
              <tr key={medication._id}>
                <Link to={`/medications/${medication._id}/add-dosage`}><td>{medication.name.toLowerCase()}</td></Link>
                <td> <p className="mobile-label">Dosage: </p>{medication.dosage}</td>
                <td> <p className="mobile-label">Frequency: </p>{medication.frequency}</td>
                <td>
                  {medication.instructions !== "" || medication.sideEffects!.length > 0 ? (
                    <button className="info-button" onClick={() => openModal(medication)}>
                      Click for Instructions/Side Effects
                    </button>
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  <p className="mobile-label">Refill Date: </p>{medication.refillDate ? (moment(medication.refillDate).format('MM/DD/YYYY')) : "No refill needed"}
                  <Link to={`/medications/${medication._id}/update-refill`}><button className="update-button">Click to Update</button></Link>
                </td>
                <td>
                  <RefillReminder medication={medication} />
                </td>
                <td>
                  <button className="remove-button" onClick={() => handleRemoveMedication(medication._id!)}>
                    Remove Medication
                  </button>
                </td>
              </tr> 
            ))}
          </tbody>) :
          (
            <div className="no-medications">
              <p>No Medications Found.</p>
            </div>)}
          </table>
        {isOpen && (
          <div className="modal-backdrop">
          <CustomModal
              isOpen = {isOpen}
              closeModal={closeModal}
              medication={selectedMedication ? selectedMedication : null}
            />
          </div>)}
          <div className="addButton">
            <Link to={"/add-medication"}><button>Add A Medication</button></Link>
          </div>
        </div>)}
      </div>
    )
}