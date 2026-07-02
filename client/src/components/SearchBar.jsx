const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-violet-400 dark:border-violet-900/50 dark:bg-[#12121c] dark:text-gray-100 sm:w-64"
    />
  );
};

export default SearchBar;
