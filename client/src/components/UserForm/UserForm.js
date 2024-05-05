import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to validate email format
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) {
      setError("Name and Email are required");
    } else if (!validateEmail(email)) {
      setError("Invalid email address");
    } else {
      setError("");
      navigate("/cup-design", { state: { name, email } });
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="card p-3 mt-3">
            <h4 className="mt-2 mb-3 text-center">Enter Your Details</h4>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <input
                type="text"
                placeholder="enter your name"
                className="mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="enter your email"
                className="mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
