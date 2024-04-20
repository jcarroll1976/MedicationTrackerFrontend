import { Medication } from "../models/UserMedication";

interface Props {
    medication: Medication;
}

export default function RefillReminder({medication}: Props) {
    const today = new Date();
      
    // Function to calculate days remaining until refill (assuming refillDate is after today)
    const daysRemaining = Math.floor((medication.refillDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
    // Logic to display refill reminder message (customize based on your requirements)
    let reminderMessage;
    if (daysRemaining <= 7 && daysRemaining > 0) {
        reminderMessage = `Refill reminder for ${medication.name}. You have ${daysRemaining} days remaining.`;
    } else if (daysRemaining <= 0) {
        reminderMessage = `Refill needed for ${medication.name}.`;
    }
      
    return (
        <div className="refill-reminder">
        {reminderMessage && <p>{reminderMessage}</p>}
        </div>
    );
};
      
