import { useState } from "react";
import axios from "axios";
import { Scanner } from "@yudiel/react-qr-scanner";
import StudentNavBar from "../../NavBar/StudentNavBar";
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  AlertTitle,
} from "@mui/material";

function StudentHome() {
  const [scanResult, setScanResult] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [qrImage, setQrImage] = useState(null);
  const [sessionId, setSessionId] = useState("");
  const [isSessionCreated, setIsSessionCreated] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setScanResult(data[0].rawValue); // The QR code data contains the sessionId or studentId
      markAttendance(data[0].rawValue); // Assuming data contains the sessionId
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const markAttendance = async (sessionId) => {
    try {
      const studentData = { sessionId, studentId: localStorage.getItem("id") };
      console.log(studentId);
      const response = await axios.post(
        "http://localhost:5000/mark-attendance",
        studentData
      );
      setAttendanceStatus(response.data.message);
    } catch (error) {
      console.error("Error marking attendance", error);
      setAttendanceStatus("Failed to mark attendance");
    }
  };

  return (
    <>
      <StudentNavBar />
      <Box sx={{ margin: 5 }}>
        <Container maxWidth="sm">
          <Paper
            elevation={10}
            sx={{
              padding: 4,
              textAlign: "center",
              borderRadius: 3,
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              QR Code Attendance System
            </Typography>

            <Typography sx={{ color: "#555", mb: 2 }}>
              Scan QR Code to Mark Attendance
            </Typography>

            {/* Scanner */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                my: 2,
              }}
            >
              <Scanner
                delay={300}
                style={{ width: "100%" }}
                onError={handleError}
                onScan={handleScan}
                styles={{ container: { width: "65%" } }}
              />
            </Box>

            {/* Attendance Confirmation */}
            {scanResult && (
              <Alert
                severity="success"
                variant="filled"
                sx={{
                  mt: 3,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <AlertTitle sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  Attendance Marked!
                </AlertTitle>
                <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                  <strong>Session ID:</strong> {scanResult}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                  {attendanceStatus}
                </Typography>
              </Alert>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default StudentHome;
