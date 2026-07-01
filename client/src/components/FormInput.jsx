const FormInput = ({ label, type = "text", error, registration, ...rest }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        className={`rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-purple-400 dark:bg-gray-900 dark:text-gray-100 ${
          error
            ? "border-red-400"
            : "border-gray-300 dark:border-gray-700"
        }`}
        {...registration}
        {...rest}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
