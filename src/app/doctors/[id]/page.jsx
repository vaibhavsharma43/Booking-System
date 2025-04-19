"use client";
import { useState, useEffect } from "react";
import React from "react";
import { getAvailableSlots, bookAppointment } from "@/lib/api";

const Page = ({ params }) => {
  const [slots, setSlot] = useState([]); // initialize as array

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const value = await getAvailableSlots("67ff3273ad9e7e8b0820e4e8", "2025-04-15", "Wednesday");
        setSlot(value || []);
      } catch (err) {
        console.error("Error fetching slots:", err);
        setSlot([]); // fallback
      }
    };

    fetchSlots();
  }, []);

  return (
    <div className="container">
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Large input
          </label>
          <input
            type="text"
            id="large-input"
            placeholder="Please Enter User Id"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Base input
          </label>
          <input
            type="date"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Small input
          </label>
          <select
            id="small-input"
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select a Slot</option>
            {slots.map((s, index) => {
  const time = `${s.hour.toString().padStart(2, "0")}:${s.minute.toString().padStart(2, "0")}`;
  return (
    <option key={index} value={time}>
      {time}
    </option>
  );
})}

          </select>
        </div>
      </form>
    </div>
  );
};

export default Page;
