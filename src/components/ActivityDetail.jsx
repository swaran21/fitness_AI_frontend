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
        console.log("Fetched activity detail:", response.data);
        setActivity(response.data);
        setRecommendation(response.data.recommendation); // ✅ just the string
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
      <div className="text-center py-20 text-gray-600 dark:text-gray-300">
        Loading activity details...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md">
      {/* Header */}
      <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400 text-center mb-6">
        Activity Details
      </h2>

      {/* Summary Section */}
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

      {/* AI Recommendation */}
      {recommendation && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-pink-600 dark:text-pink-400">
            AI Recommendation
          </h3>

          {/* Analysis (actual recommendation text) */}
          <div>
            <h4 className="text-lg font-medium mb-1">Analysis</h4>
            <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {recommendation}
            </p>
            <hr className="my-4 border-gray-300 dark:border-gray-600" />
          </div>

          {/* Improvements */}
          {activity.improvements?.length > 0 && (
            <div>
              <h4 className="text-lg font-medium mb-1">Improvements</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {activity.improvements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <hr className="my-4 border-gray-300 dark:border-gray-600" />
            </div>
          )}

          {/* Suggestions */}
          {activity.suggestions?.length > 0 && (
            <div>
              <h4 className="text-lg font-medium mb-1">Suggestions</h4>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {activity.suggestions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <hr className="my-4 border-gray-300 dark:border-gray-600" />
            </div>
          )}

          {/* Safety Guidelines */}
          {activity.safety?.length > 0 && (
            <div>
              <h4 className="text-lg font-medium mb-1">Safety Guidelines</h4>
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
