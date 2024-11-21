const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors

const app = express();
const PORT = 8080;

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
