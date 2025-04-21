// lib/utils/generateSlots.js

export function generateSlots(availability) {
    const slots = [];

  
    availability.forEach(({ start, end, active }) => {
      if (!active) return;
  
      let [startHour, startMinute] = start.split(":").map(Number);
      let [endHour, endMinute] = end.split(":").map(Number);
  
      while (startHour < endHour || (startHour === endHour && startMinute < endMinute)) {
        const h = String(startHour).padStart(2, "0");
        const m = String(startMinute).padStart(2, "0");
        slots.push(`${h}:${m}`);
  
        startMinute += 30;
        if (startMinute >= 60) {
          startMinute = 0;
          startHour++;
        }
      }
    });
  
    return slots;
  }
  