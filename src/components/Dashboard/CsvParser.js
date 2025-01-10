import React, { useEffect } from 'react';
import Papa from 'papaparse';

const CsvParser = ({ onDataParsed }) => {
  useEffect(() => {
    // Hardcoded path to the CSV file in the public folder
    Papa.parse('/sme.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        // Pass parsed data to parent component
        onDataParsed(result.data);
        
        // Log the first row to the console
        console.log(result.data[0]);
      },
      error: (error) => {
        console.error('Error loading CSV:', error);
      }
    });
  }, [onDataParsed]);

  return (
    <div>
    </div>
  );
};

export default CsvParser;
