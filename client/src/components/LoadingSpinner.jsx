const LoadingSpinner = () => {
  return (
    <div className="flex justify-center py-10">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
    </div>
  );
};

export default LoadingSpinner;
