import './DropdownSelector.css';

const DropdownSelector = ({ label, options, onChange, getOptionLabel }) => {
  return (
    <div className="dropdown-selector">
      <label>{label}</label>
      <select
        onChange={(e) => {
          const selectedIndex = e.target.selectedIndex - 1; // Adjust for placeholder "Select..." option
          if (selectedIndex >= 0) {
            onChange(options[selectedIndex]);
          } else {
            onChange(null); // No selection
          }
        }}
      >
        <option value="">Select...</option>
        {options.map((option, index) => (
          <option key={index} value={index}>
            {getOptionLabel ? getOptionLabel(option) : option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelector;
