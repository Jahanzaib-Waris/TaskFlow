import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { getDashboard } from "../services/dashboardService";
import DashboardCard from "../components/DashboardCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import getErrorMessage from "../utils/getErrorMessage";

const statusStyles = {
  Todo: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  "In Progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Completed: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
};

const Dashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then(setSummary)
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Welcome, {user?.name}
      </h1>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <DashboardCard label="Total Projects" value={summary.totalProjects} />
        <DashboardCard label="Total Tasks" value={summary.totalTasks} />
        <DashboardCard label="Completed Tasks" value={summary.completedTasks} />
        <DashboardCard label="Pending Tasks" value={summary.pendingTasks} />
      </div>

      <h2 className="mt-8 mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        Recent Tasks
      </h2>

      {summary.recentTasks.length === 0 ? (
        <EmptyState message="No tasks yet. Create a project and add your first task." />
      ) : (
        <div className="flex flex-col gap-3">
          {summary.recentTasks.map((task) => (
            <Link
              key={task._id}
              to={`/projects/${task.project._id}`}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition hover:border-purple-300 dark:border-gray-800 dark:bg-gray-900"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">{task.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{task.project.title}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[task.status]}`}>
                {task.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
