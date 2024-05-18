import { Medication } from "../models/UserMedication";

interface Props {
    medication: Medication;
}

export default function RefillReminder({medication}: Props) {
    const today = new Date().toString();
      
    // Function to calculate days remaining until refill (assuming refillDate is a string after today)
  const daysRemaining = calculateDaysRemaining(medication?.refillDate, today);
      
    // Logic to display refill reminder message (customize based on your requirements)
    let reminderMessage;
    if (medication.refillDate && daysRemaining! <= 7 && daysRemaining! > 0) {
        reminderMessage = `Refill reminder for ${medication.name}. You have ${daysRemaining} days remaining.`;
    } else if (medication.refillDate && daysRemaining! <= 0) {
        reminderMessage = `Refill needed for ${medication.name}.`;
    }
      
    return (
        <div className="refill-reminder">
        {reminderMessage && <p>{reminderMessage}</p>}
        </div>
    );

    // Helper function to calculate days remaining
function calculateDaysRemaining(refillDateString: string | undefined, todayString: string) {
    if (!refillDateString) {
      console.warn("Refill date not available for", medication.name);
      return null; // Or any default value you prefer
    }
  
    // Parse the refill date and today strings into Date objects
    const refillDate = new Date(refillDateString);
    const today = new Date(todayString);
  
    // Ensure today is before refill date to avoid negative values
    if (today >= refillDate) {
      return 0; // Refill needed or date has passed
    }
  
    // Calculate the time difference in milliseconds
    const timeDifference = refillDate.getTime() - today.getTime();
  
    // Convert milliseconds to days and round down to the nearest whole day
    const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysRemaining;
  }
};


