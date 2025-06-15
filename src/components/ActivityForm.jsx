import React, { useState } from "react";
import { addActivity } from "../services/api";

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    additionalMetrics: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addActivity(activity);
      onActivityAdded();
      setActivity({
        type: "RUNNING",
        duration: "",
        caloriesBurned: "",
        additionalMetrics: {},
      });
    } catch (error) {
      console.error("Failed to add activity:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md border border-dashed border-gray-400 space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        Add Activity
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded transition"
      >
        Add Activity
      </button>
    </form>
  );
};

export default ActivityForm;
