export function mergeUniqueSlots(slots1, slots2) {
    const merged = [...slots1, ...slots2];
    const unique = Array.from(new Set(merged));
    return unique.sort(); // optional: sorts by time
  }
  