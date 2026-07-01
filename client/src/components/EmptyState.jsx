const EmptyState = ({ message }) => {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
      {message}
    </div>
  );
};

export default EmptyState;
