// import React, { useState } from "react";
// import axios from "axios";
// import Select from "react-select";

// const App = () => {
//   const [jsonInput, setJsonInput] = useState("");
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const dropdownOptions = [
//     { value: "alphabets", label: "Alphabets" },
//     { value: "numbers", label: "Numbers" },
//     {
//       value: "highest_lowercase_alphabet",
//       label: "Highest Lowercase Alphabet",
//     },
//   ];

//   const handleSubmit = async () => {
//     try {
//       // Validate JSON input
//       let parsedInput;
//       try {
//         parsedInput = JSON.parse(jsonInput);
//       } catch (err) {
//         setError("Invalid JSON input!");
//         return;
//       }

//       setError(null);

//       // Make POST request to the backend
//       const res = await axios.post(
//         "https://bfhlback-ftakpzsa0-rjain1002s-projects.vercel.app/",
//         parsedInput
//       );
//       setResponse(res.data);
//     } catch (err) {
//       setError("Failed to fetch response from the backend.");
//     }
//   };

//   const renderResponse = () => {
//     if (!response) return null;

//     // Filter response data based on dropdown selections
//     const filteredResponse = {};
//     selectedOptions.forEach((option) => {
//       filteredResponse[option.value] = response[option.value];
//     });

//     return (
//       <div>
//         <h3>Response:</h3>
//         <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
//       </div>
//     );
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h1>BFHL Challenge</h1>

//       <div>
//         <label htmlFor="json-input">JSON Input:</label>
//         <textarea
//           id="json-input"
//           rows="5"
//           cols="50"
//           placeholder='Example: { "data": ["A", "1", "z"] }'
//           value={jsonInput}
//           onChange={(e) => setJsonInput(e.target.value)}
//           style={{ display: "block", margin: "10px 0", padding: "10px" }}
//         />
//       </div>

//       <button
//         onClick={handleSubmit}
//         style={{ padding: "10px 20px", cursor: "pointer" }}
//       >
//         Submit
//       </button>

//       {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}

//       {response && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>Select Fields to Display:</h3>
//           <Select
//             isMulti
//             options={dropdownOptions}
//             onChange={setSelectedOptions}
//             placeholder="Select fields..."
//           />
//           {renderResponse()}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Helper function to check for prime numbers
const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// GET Endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST Endpoint
app.post("/bfhl", (req, res) => {
  console.log(req.body);
  const { data, file_b64 } = req.body;

  if (!data || !Array.isArray(data)) {
    return res
      .status(400)
      .json({ is_success: false, message: "Invalid input data" });
  }

  const numbers = [];
  const alphabets = [];
  let highestLowercase = "";
  let isPrimeFound = false;

  // Process the data
  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
      if (isPrime(Number(item))) isPrimeFound = true;
    } else if (typeof item === "string" && /^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (item === item.toLowerCase() && item > highestLowercase) {
        highestLowercase = item;
      }
    }
  });

  // Mock file validation
  const fileValid = !!file_b64;
  const fileMimeType = fileValid ? "application/mock" : null;
  const fileSizeKb = fileValid ? 400 : null;

  // Build the response
  res.json({
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    is_prime_found: isPrimeFound,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKb,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend is running at http://localhost:${PORT}`);
});
