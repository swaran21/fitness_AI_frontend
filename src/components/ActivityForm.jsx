// src/components/ActivityForm.js
import React, { useState } from "react";
import { addActivity } from "../services/api";

const ActivityForm = () => {
  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addActivity(activity);
      setActivity({
        type: "RUNNING",
        duration: "",
        caloriesBurned: "",
      });
    } catch (error) {
      console.error("Failed to add activity:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6 max-w-md mx-auto mt-8"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-4">
        Track a New Activity
      </h2>

      {/* Activity Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Activity Type
        </label>
        <select
          name="type"
          value={activity.type}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 outline-none"
        >
          <option value="RUNNING">Running</option>
          <option value="WALKING">Walking</option>
          <option value="CYCLING">Cycling</option>
        </select>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Duration (Minutes)
        </label>
        <input
          type="number"
          name="duration"
          value={activity.duration}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 outline-none"
          required
        />
      </div>

      {/* Calories Burned */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Calories Burned
        </label>
        <input
          type="number"
          name="caloriesBurned"
          value={activity.caloriesBurned}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-pink-500 outline-none"
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg shadow-sm hover:shadow-md transition duration-300"
        >
          Add Activity
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;
