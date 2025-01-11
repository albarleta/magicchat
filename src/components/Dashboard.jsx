import React from "react";
import { Link } from "react-router-dom";
import { FaTicketAlt, FaChartLine, FaClock, FaCheck } from "react-icons/fa";
// import { useAuth } from "../context/AuthContext";

function Dashboard() {
  //   const { user } = useAuth();
  const user = true;

  const stats = [
    { icon: FaTicketAlt, label: "Active Tickets", value: "12" },
    { icon: FaChartLine, label: "Resolution Rate", value: "85%" },
    { icon: FaClock, label: "Avg Response Time", value: "2h" },
    { icon: FaCheck, label: "Resolved Today", value: "8" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.email}
        </h1>
        <p className="text-gray-600">
          Here's an overview of your support activities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className="text-blue-500 text-3xl" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Recent Tickets</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((ticket) => (
            <div key={ticket} className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Ticket #{ticket}</h3>
                  <p className="text-sm text-gray-500">
                    Hardware issue with printer
                  </p>
                </div>
                <Link
                  to="/chat"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Respond
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
