// /api/bfhl.js

const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors

// Helper function to check for prime numbers
const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

module.exports = (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");

  // Middleware to parse JSON
  if (req.method === "POST") {
    const { data, file_b64 } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input data",
      });
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
    return res.json({
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
  }

  // GET Endpoint
  if (req.method === "GET") {
    return res.status(200).json({ operation_code: 1 });
  }

  // If not GET or POST, return 405
  res.status(405).send("Method Not Allowed");
};
