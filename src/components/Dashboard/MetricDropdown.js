import React from 'react';
import Select from 'react-select';


// Define the custom styles for the dropdown
const customStyles = {
  container: (provided) => ({
    ...provided,
    width: '300px', // Adjust the width of the dropdown
    position: 'relative', // Make sure dropdown stays relative to its container
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '5px 10px',
    transition: 'all 0.3s ease',
    '&:hover': {
    },
  }),
  menu: (provided) => ({
    ...provided,
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'flex-start',
    padding: '5px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    marginTop: '5px',
  }),
  option: (provided, state) => ({
    ...provided,
    padding: '10px 20px',
    backgroundColor: state.isSelected ? '#917ec0' : 'transparent',
    color: state.isSelected ? '#fff' : '#444',
    cursor: 'pointer',
    marginBottom: '5px',
    borderRadius: '10px',
    fontWeight:state.isSelected? 'bold':'',
    transition: 'all 0.3s ease',
    '&:hover': {
    backgroundColor: '#6658bb',
    fontWeight: 'bold',
    color:'white',
},

  }),
};

// MetricDropdown Component
const MetricDropdown = ({ selectedMetric, onSelectMetric }) => {
  const options = [
    { value: 'Likes', label: 'Likes' },
    { value: 'Comments', label: 'Comments' },
    { value: 'Shares', label: 'Shares' },
    { value: 'Views', label: 'Views' },
  ];

  return (
    <div style={{ marginLeft: '10px', marginTop: '20px', marginBottom:'20px' }}>
      <Select
        options={options}
        value={options.find((option) => option.value === selectedMetric)}
        onChange={(selectedOption) => onSelectMetric(selectedOption.value)}
        styles={customStyles}
        isSearchable={false}
      />
    </div>
  );
};

export default MetricDropdown;
