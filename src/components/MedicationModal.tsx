import React from 'react';
import Modal from "react-modal";
import { Medication } from '../models/UserMedication';


interface Props {
    isOpen: boolean;
    closeModal: () => void;
    title: string;
    children: React.ReactNode;
}

function MedicationModal({isOpen,closeModal,title,children}:Props) {
  return (
    <div>
        <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel={title}>
            <h2>{title}</h2>
            {children}
            <button onClick={closeModal}>Close</button>
        </Modal>
    </div>
  )
}

export default MedicationModal