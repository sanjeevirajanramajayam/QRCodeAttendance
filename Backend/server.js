const express = require('express');
const QRCode = require('qrcode');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mysql = require('mysql2');
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

app.get('/generate-qr/:studentId', async (req, res) => {
    const {
        studentId
    } = req.params;
    try {
        const qrCodeDataUrl = await QRCode.toDataURL(studentId);
        res.json({
            qrCode: qrCodeDataUrl
        });
    } catch (error) {
        console.error('Error generating QR code', error);
        res.status(500).send('Error generating QR code');
    }
});

// app.post('/mark-attendance', (req, res) => {
//     const {
//         studentId
//     } = req.body;
//     const timestamp = new Date();

//     if (!studentId) {
//         return res.status(400).json({
//             message: 'Student ID is required'
//         });
//     }

//     const query = 'INSERT INTO attendance (student_id, timestamp) VALUES (?, ?)';

//     db.query(query, [studentId, timestamp], (err, result) => {
//         if (err) {
//             console.error('Error marking attendance:', err);
//             return res.status(500).json({
//                 message: 'Failed to mark attendance'
//             });
//         }

//         res.status(200).json({
//             message: 'Attendance marked successfully',
//             studentId,
//             timestamp
//         });
//     });
// });



app.post('/create-session', async (req, res) => {
    const {
        facultyId,
        courseName
    } = req.body;
    const sessionId = `session-${Date.now()}`;

    try {
        const qrCodeDataUrl = await QRCode.toDataURL(sessionId);

        const query = 'INSERT INTO sessions (session_id, faculty_id, course_name, qr_code_url) VALUES (?, ?, ?, ?)';
        db.query(query, [sessionId, facultyId, courseName, qrCodeDataUrl], (err, result) => {
            if (err) {
                console.error('Error creating session:', err);
                return res.status(500).json({
                    message: 'Failed to create session'
                });
            }

            res.status(200).json({
                message: 'Session created successfully',
                sessionId,
                qrCode: qrCodeDataUrl
            });
        });

    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({
            message: 'Failed to generate QR code'
        });
    }
});

app.post('/mark-attendance', (req, res) => {
    const {
        sessionId,
        studentId
    } = req.body;
    const timestamp = new Date();

    if (!sessionId || !studentId) {
        return res.status(400).json({
            message: 'Session ID and Student ID are required'
        });
    }

    const checkSessionQuery = 'SELECT * FROM sessions WHERE session_id = ?';
    db.query(checkSessionQuery, [sessionId], (err, results) => {
        if (err) {
            console.error('Error checking session:', err);
            return res.status(500).json({
                message: 'Error checking session'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: 'Session not found'
            });
        }

        const insertAttendanceQuery = 'INSERT INTO attendance (session_id, student_id, timestamp) VALUES (?, ?, ?)';
        db.query(insertAttendanceQuery, [sessionId, studentId, timestamp], (err, result) => {
            if (err) {
                console.error('Error marking attendance:', err);
                return res.status(500).json({
                    message: 'Failed to mark attendance'
                });
            }

            res.status(200).json({
                message: 'Attendance marked successfully',
                studentId,
                sessionId,
                timestamp
            });
        });
    });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
