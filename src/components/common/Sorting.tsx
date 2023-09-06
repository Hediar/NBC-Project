'use client';

const Sorting: React.FC<SortingProps> = ({ options, selectedOption, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-600"></span>
      <select className="border rounded px-2 py-1" value={selectedOption} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sorting;
