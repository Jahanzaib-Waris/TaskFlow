import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Welcome, {user?.name}
      </h1>
      <p className="text-gray-500 dark:text-gray-400">
        Dashboard content is coming in a later milestone.
      </p>
      <button
        onClick={logout}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        Log out
      </button>
    </div>
  );
};

export default Dashboard;
