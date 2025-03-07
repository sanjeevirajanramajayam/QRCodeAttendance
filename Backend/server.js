const express = require("express");
const QRCode = require("qrcode"); // Import the qrcode package
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MySQL database connection
const mysql = require("mysql2");
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});

// Route to generate QR code from studentId
app.get("/generate-qr/:studentId", async (req, res) => {
  const { studentId } = req.params;
  console.log("Generating QR code for student ID:", studentId);
  try {
    // Generate QR code as a Data URL (Base64 string)
    const qrCodeDataUrl = await QRCode.toDataURL(studentId);
    res.json({
      qrCode: qrCodeDataUrl,
    }); // Send the QR code as JSON
  } catch (error) {
    console.error("Error generating QR code", error);
    res.status(500).send("Error generating QR code");
  }
});

// Route to mark attendance
app.post("/mark-attendance", (req, res) => {
  const { studentId } = req.body; // Receive studentId from frontend
  const timestamp = new Date(); // Get the current timestamp

  // Ensure studentId is provided
  if (!studentId) {
    return res.status(400).json({
      message: "Student ID is required",
    });
  }

  const query = "INSERT INTO attendance (student_id, timestamp) VALUES (?, ?)";

  // Insert attendance record into MySQL database
  db.query(query, [studentId, timestamp], (err, result) => {
    if (err) {
      console.error("Error marking attendance:", err);
      return res.status(500).json({
        message: "Failed to mark attendance",
      });
    }

    // Return success message along with student ID and timestamp
    res.status(200).json({
      message: "Attendance marked successfully",
      studentId,
      timestamp,
    });
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and Password are required",
    });
  }

  const query = "SELECT role from users where username = ? and password = ?";

  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error("Error marking attendance:", err);
      return res.status(500).json({
        message: "Failed to mark attendance",
      });
    }

    res.status(200).json({ result });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
