import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const dropdownOptions = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    {
      value: "highest_lowercase_alphabet",
      label: "Highest Lowercase Alphabet",
    },
  ];

  const handleSubmit = async () => {
    try {
      // Validate JSON input
      let parsedInput;
      try {
        parsedInput = JSON.parse(jsonInput);
      } catch (err) {
        setError("Invalid JSON input!");
        return;
      }

      setError(null);

      // Make POST request to the backend
      const res = await axios.post(
        "https://bfhlback-ftakpzsa0-rjain1002s-projects.vercel.app/",
        parsedInput
      );
      setResponse(res.data);
    } catch (err) {
      setError("Failed to fetch response from the backend.");
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    // Filter response data based on dropdown selections
    const filteredResponse = {};
    selectedOptions.forEach((option) => {
      filteredResponse[option.value] = response[option.value];
    });

    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>BFHL Challenge</h1>

      <div>
        <label htmlFor="json-input">JSON Input:</label>
        <textarea
          id="json-input"
          rows="5"
          cols="50"
          placeholder='Example: { "data": ["A", "1", "z"] }'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          style={{ display: "block", margin: "10px 0", padding: "10px" }}
        />
      </div>

      <button
        onClick={handleSubmit}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Submit
      </button>

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}

      {response && (
        <div style={{ marginTop: "20px" }}>
          <h3>Select Fields to Display:</h3>
          <Select
            isMulti
            options={dropdownOptions}
            onChange={setSelectedOptions}
            placeholder="Select fields..."
          />
          {renderResponse()}
        </div>
      )}
    </div>
  );
};

export default App;
