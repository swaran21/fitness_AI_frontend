// src/components/ActivityList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActivities } from "../services/api";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        Your Activities
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            onClick={() => navigate(`/activities/${activity.id}`)}
            className="bg-white dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out p-5 cursor-pointer hover:scale-[1.02]"
          >
            <h3 className="text-xl font-semibold text-pink-600 dark:text-pink-400 mb-2 capitalize">
              {activity.type.toLowerCase()}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              <span className="font-medium">Duration:</span> {activity.duration}{" "}
              min
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Calories Burned:</span>{" "}
              {activity.caloriesBurned}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
