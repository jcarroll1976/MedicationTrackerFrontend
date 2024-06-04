import React, { FormEvent, useState } from 'react';

interface UpdateRefillDateProps {
  medicationId: string; // ID of the medication to update
  onSubmit: (medicationId: string, newRefillDate: string) => void; // Function to handle form submission
}

export default function UpdateRefillDate({ medicationId, onSubmit }: UpdateRefillDateProps) {
  const [newRefillDate, setNewRefillDate] = useState<string>('');


  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    onSubmit(medicationId, newRefillDate);
    setNewRefillDate(''); // Clear form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-refill-date">
        New Refill Date:
        <input
          type="date"
          id="new-refill-date"
          value={newRefillDate}
          onChange={(e) => setNewRefillDate(new Date(e.target.value).toString())}
          required
        />
      </label>
      <button type="submit">Update Refill Date</button>
    </form>
  );
};


