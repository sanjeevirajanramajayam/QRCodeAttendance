const express = require("express");
const QRCode = require("qrcode");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

const jwt = require("jsonwebtoken");

const JWT_SECRET = "your-secret-key"; // Replace with a strong secret

app.post("/create-session", async (req, res) => {
  const { facultyId, courseName } = req.body;
  const sessionId = `session-${Date.now()}`;

  try {
    const token = jwt.sign({ sessionId, facultyId, courseName }, JWT_SECRET, {
      expiresIn: "30s",
    });

    const qrCodeDataUrl = await QRCode.toDataURL(token);

    const query =
      "INSERT INTO sessions (session_id, faculty_id, course_name, qr_code_url) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [sessionId, facultyId, courseName, token],
      (err, result) => {
        if (err) {
          console.error("Error creating session:", err);
          return res.status(500).json({ message: "Failed to create session" });
        }

        res.status(200).json({
          message: "Session created successfully",
          sessionId,
          qrCode: qrCodeDataUrl,
          token,
        });
      }
    );
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ message: "Failed to generate QR code" });
  }
});

app.post("/mark-attendance", (req, res) => {
  const { token, studentId } = req.body; // Expecting token instead of sessionId
  const timestamp = new Date();

  if (!token || !studentId) {
    return res.status(400).json({
      message: "Token and Student ID are required",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { sessionId, facultyId, courseName } = decoded;

    const checkSessionQuery = "SELECT * FROM sessions WHERE session_id = ?";
    db.query(checkSessionQuery, [sessionId], (err, results) => {
      if (err) {
        console.error("Error checking session:", err);
        return res.status(500).json({ message: "Error checking session" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Session not found" });
      }

      const insertAttendanceQuery =
        "INSERT INTO attendance (session_id, student_id, timestamp) VALUES (?, ?, ?)";
      db.query(
        insertAttendanceQuery,
        [sessionId, studentId, timestamp],
        (err, result) => {
          if (err) {
            console.error("Error marking attendance:", err);
            return res
              .status(500)
              .json({ message: "Failed to mark attendance" });
          }

          res.status(200).json({
            message: "Attendance marked successfully",
            studentId,
            sessionId,
            facultyId,
            courseName,
            timestamp,
          });
        }
      );
    });
  } catch (error) {
    console.error("Invalid or expired token:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and Password are required",
    });
  }

  const query =
    "SELECT role, id from users where username = ? and password = ?";

  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error("Error marking attendance:", err);
      return res.status(500).json({
        message: "Failed to mark attendance",
      });
    }

    res.status(200).json({
      result,
    });
  });
});

app.post("/get-attendence", (req, res) => {
  const { id } = req.body;

  const selectQuery = "SELECT * FROM users WHERE id = ?";

  db.query(selectQuery, [id], (err, selectResults) => {
    if (err) {
      console.error("Error fetching attendance:", err);
      return res.status(500).json({
        message: "Failed to fetch attendance",
      });
    }

    const query = "SELECT * FROM attendance WHERE student_id = ?";

    db.query(query, [id], (err, attendanceResults) => {
      if (err) {
        console.error("Error fetching attendance:", err);
        return res.status(500).json({
          message: "Failed to fetch attendance",
        });
      }

      if (attendanceResults.length === 0) {
        return res.status(404).json({
          message: "No attendance records found",
        });
      }

      const sessionIds = attendanceResults.map((record) => record.session_id);
      const timestamps = attendanceResults.map((record) => record.timestamp);

      const sessionQuery = `SELECT * FROM sessions WHERE session_id IN (${sessionIds
        .map(() => "?")
        .join(",")})`;

      db.query(sessionQuery, sessionIds, (err, sessionResults) => {
        if (err) {
          console.error("Error fetching session details:", err);
          return res.status(500).json({
            message: "Failed to fetch session details",
          });
        }

        res.status(200).json({
          sessions: sessionResults,
          timestamps,
          username: selectResults[0].username,
        });
      });
    });
  });
});

app.post("/get-students-by-session", (req, res) => {
  const { session_id } = req.body;

  const sessionQuery =
    "SELECT faculty_id, course_name FROM sessions WHERE session_id = ?";

  db.query(sessionQuery, [session_id], (err, sessionResult) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Failed to fetch session details" });
    }

    if (sessionResult.length === 0) {
      return res.status(404).json({ message: "Session not found" });
    }
    console.log(sessionResult);
    const { faculty_id, course_name } = sessionResult[0];

    const attendanceQuery = "SELECT * FROM attendance WHERE session_id = ?";

    db.query(attendanceQuery, [session_id], (err, attendanceResults) => {
      if (err) {
        return res.status(500).json({ message: "Failed to fetch attendance" });
      }

      if (attendanceResults.length === 0) {
        return res
          .status(404)
          .json({ message: "No attendance records found for this session" });
      }

      const studentIds = attendanceResults.map((record) => record.student_id);

      const userQuery = "SELECT id, username FROM users WHERE id IN (?)";

      db.query(userQuery, [studentIds], (err, userResults) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Failed to fetch student details" });
        }

        if (userResults.length === 0) {
          return res
            .status(404)
            .json({ message: "No student records found for this session" });
        }

        const studentMap = {};
        userResults.forEach((user) => {
          studentMap[user.id] = user.username;
        });

        const response = attendanceResults.map((attendance) => ({
          student_name: studentMap[attendance.student_id] || "Unknown",
          timestamp: attendance.timestamp,
          course_code: course_code,
          faculty_id: faculty_id,
        }));

        res.status(200).json(response);
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
