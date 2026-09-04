import React from "react";
import { Link } from "react-router-dom";

const LiveIncidents = ({ incidents }) => {
  const SEV_COLOR = {
    critical: "#F0555B",
    high: "#E88A2B",
    medium: "#4C9EEB",
    low: "#34D399",
  };

  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };

  const activeIncidents = (incidents ?? [])
    .filter((inc) => inc.status !== "resolved")
    .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity])
    .slice(0, 6);

  return (
    <div className="">
      <div className="flex justify-between p-1 border-b border-b-gray-700">
        <h1 className="text-gray-400 text-sm">LIVE INCIDENTS</h1>
        <p className="text-gray-600">real-time</p>
      </div>
      <div className="overflow-y-auto max-h-96 scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-900 scrollbar-thin" >
        {activeIncidents.length === 0 && (
          <p className="text-white p-2 font-bold">No incidents right now.</p>
        )}
        {activeIncidents.map((inc) => {
          return (
            <div className="border-b border-b-gray-700 p-1 ">
              <Link
                to={`/incidents/${inc._id}`}
                key={inc._id}
                className="grid lg:grid-cols-3 p-2"
              >
                <div
                  className="w-20 h-7 rounded-full border flex items-center justify-center"
                  style={{ background: SEV_COLOR[inc.severity] }}
                >
                <div className="size-5 border border-gray-800" style={{ color: SEV_COLOR[inc.severity] }}>
                  {inc.severity}
                </div>
                </div>
                <div className="text-white">{inc.title}</div>
                <div className="text-gray-500">
                  {new Date(inc.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {""} . {inc.status}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveIncidents;
