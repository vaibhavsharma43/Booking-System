export function getAvailableSlotsAfterAppointments(slots,appointments){
    const bookedSlotSet = new Set(appointments.map(a => a.slot)); // a.slot should be "HH:MM"
  
    // No need to format — just check if the slot is booked
    return slots.filter(slot => !bookedSlotSet.has(slot));
}