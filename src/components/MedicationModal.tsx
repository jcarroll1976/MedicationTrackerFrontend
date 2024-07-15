/*import React from 'react';
import Modal from "react-modal";
import { Medication } from '../models/UserMedication';
import "./MedicationModal.css";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
  selectedMedication?: Medication | null; // Add selectedMedication prop with optional type
}


function MedicationModal({ isOpen, closeModal, title, children,selectedMedication }: Props) {
  return (
    <div>
      <Modal className="modal" isOpen={isOpen} onRequestClose={closeModal} contentLabel={title}>
        <h2>{title}</h2>
        {children}
        <div style={{textAlign:"center"}}>
          <button style={{
                          backgroundColor: '#d9534f', 
                          color:"#fff",
                          border: "none",
                          padding: "0.5rem 1rem",
                          borderRadius: "4px",
                          cursor: "pointer",
                          margin: "o.25rem"}} onClick={closeModal}
                          >Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default MedicationModal;*/

import { Medication } from "../models/UserMedication";
import "./MedicationModal.css"

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  medication: Medication | null;
}

export default function CustomModal({isOpen,closeModal,medication}:Props) {


  
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{medication?.name} details</h2>
        {medication?.instructions ? (
          <div className="instructions">
            <h3>Instructions</h3>
            <div className="scrollable-content instructions-text">
            <p>{medication?.instructions}</p>
            </div>
          </div>
        ):(
          <div className="instructions">
            <h3>Instructions</h3>
            <p>No instructions available.</p>
          </div>
        )}
        {medication?.sideEffects && (
          <div className="side-effects">
            <h3>Side Effects</h3>
            <div className="scrollable-content">
            {typeof medication?.sideEffects === 'string' ? (
              <p>{medication?.sideEffects}</p>
            ) : (
              <ul>
                {medication?.sideEffects.map((sideEffect) => (
                  <li key={sideEffect}><p>{sideEffect}</p></li>
                ))}
              </ul>
            )}
            </div>
            {medication.sideEffects.length === 0 && (<p>No side effects available.</p>)}
          </div>
        )}
        <div className="close-modal">
          <button className="close-button" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
