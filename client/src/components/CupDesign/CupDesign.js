import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CupDesign = () => {
  const [teaLevel, setTeaLevel] = useState(100);
  const [optionSelected, setOptionSelected] = useState(null);
  const location = useLocation();
  const { name, email } = location.state;

  useEffect(() => {
    const timer = setInterval(() => {
      setTeaLevel((prev) => (prev > 0 ? prev - 3.33 : 0));
    }, 1000);

    if (optionSelected !== null) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [optionSelected]);

  const handleOptionSelect = (option) => {
    setOptionSelected(option);
    setTeaLevel(0);
    const data = {
      name,
      email,
      optionSelected: option,
      timestamp: new Date().toISOString(),
    };

    axios
      .post("http://localhost:5000/api/save-option", data)
      .then((response) => console.log("Data saved:", response.data))
      .catch((error) => console.error("Error saving data:", error));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="card p-4 mt-5">
            <h4 className="text-center mb-3">Cup Design</h4>
            <div
              style={{
                height: "200px",
                width: "100px",
                border: "1px solid black",
                margin: "auto",
              }}
            >
              <div
                style={{
                  height: `${teaLevel}%`,
                  backgroundColor: "brown",
                }}
              ></div>
            </div>
            {teaLevel > 0 ? (
              <div className="mt-3">
                <button
                  className="btn btn-success w-100"
                  onClick={() => handleOptionSelect(1)}
                >
                  Option 1
                </button>
                <button
                  className="btn btn-success w-100 mt-3"
                  onClick={() => handleOptionSelect(2)}
                >
                  Option 2
                </button>
              </div>
            ) : (
              <p className="text-center mt-3">Options have disappeared</p>
            )}
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default CupDesign;
