import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const CupDesign = () => {
  const [teaLevel, setTeaLevel] = useState(100); // Initial tea level
  const [optionSelected, setOptionSelected] = useState(null);
  const location = useLocation(); // Get name and email from route state
  const { name, email } = location.state;

  useEffect(() => {
    // Decrease tea level by 3.33% every second (30 seconds to empty)
    const timer = setInterval(() => {
      setTeaLevel((prev) => (prev > 0 ? prev - 3.33 : 0));
    }, 1000);

    // Stop timer if an option is selected
    if (optionSelected !== null) {
      clearInterval(timer);
    }

    return () => clearInterval(timer); // Cleanup timer
  }, [optionSelected]);

  const handleOptionSelect = (option) => {
    setOptionSelected(option); // Stop the timer
    setTeaLevel(0); // Stop tea drain
    const data = {
      name,
      email,
      optionSelected: option,
      timestamp: new Date().toISOString(),
    };

    // Save data to the database via a POST request
    axios
      .post('http://localhost:5000/api/save-option', data)
      .then((response) => console.log('Data saved:', response.data))
      .catch((error) => console.error('Error saving data:', error));
  };

  return (
    <div>
      <h2>Cup Design</h2>
      <div style={{ height: '200px', width: '100px', border: '1px solid black' }}>
        <div
          style={{
            height: `${teaLevel}%`,
            backgroundColor: 'brown',
          }}
        ></div>
      </div>
      {teaLevel > 0 ? (
        <div>
          <button onClick={() => handleOptionSelect(1)}>Option 1</button>
          <button onClick={() => handleOptionSelect(2)}>Option 2</button>
        </div>
      ) : (
        <p>Options have disappeared</p>
      )}
    </div>
  );
};

export default CupDesign;
