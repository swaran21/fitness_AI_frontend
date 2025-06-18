import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivityDetail } from "../services/api";

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await getActivityDetail(id);
        setActivity(response.data);
        setRecommendation(response.data.recommendation);
      } catch (error) {
        console.error("Error fetching activity details:", error);
        setError("Failed to load activity details.");
      }
    };

    fetchActivityDetail();
  }, [id]);

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="text-center py-20">
        {/* Tailwind loading spinner */}
        <svg
          className="mx-auto h-10 w-10 animate-spin text-pink-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Loading activity details...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400 text-center mb-6">
        Activity Details
      </h2>

      <div className="space-y-2 text-gray-800 dark:text-gray-200">
        <p>
          <span className="font-semibold">Type:</span> {activity.type || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Duration:</span>{" "}
          {activity.duration != null ? `${activity.duration} minutes` : "N/A"}
        </p>
        <p>
          <span className="font-semibold">Calories Burned:</span>{" "}
          {activity.caloriesBurned != null ? activity.caloriesBurned : "N/A"}
        </p>
        <p>
          <span className="font-semibold">Date:</span>{" "}
          {activity.createdAt
            ? new Date(activity.createdAt).toLocaleString()
            : "N/A"}
        </p>
      </div>

      <hr className="my-6 border-gray-300 dark:border-gray-600" />

      {recommendation && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-pink-600 dark:text-pink-400">
            AI Recommendation
          </h3>

          <div>
            <h4 className="text-lg font-medium mb-2">Analysis</h4>
            <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {recommendation}
            </p>
            <hr className="my-4 border-gray-300 dark:border-gray-600" />
          </div>

          {activity.improvements?.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-2 text-pink-600 dark:text-pink-400">
                Improvements
              </h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {activity.improvements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <hr className="my-4 border-gray-300 dark:border-gray-600" />
            </div>
          )}

          {activity.suggestions?.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-2 text-pink-600 dark:text-pink-400">
                Suggestions
              </h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {activity.suggestions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <hr className="my-4 border-gray-300 dark:border-gray-600" />
            </div>
          )}

          {activity.safety?.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-medium mb-2 text-pink-600 dark:text-pink-400">
                Safety Guidelines
              </h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {activity.safety.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityDetail;
