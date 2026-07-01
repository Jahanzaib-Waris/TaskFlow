import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100">404</h1>
      <p className="text-gray-500 dark:text-gray-400">Page not found.</p>
      <Link to="/" className="font-medium text-purple-600 hover:underline">
        Go home
      </Link>
    </div>
  );
};

export default NotFound;
