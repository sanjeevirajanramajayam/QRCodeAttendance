import React, { useState } from "react";
import axios from "axios";
import { Box, Container, Paper, Typography, Button } from "@mui/material";
import AdminNavBar from "../../NavBar/AdminNavBar";

function AdminHome() {
  const [qrImage, setQrImage] = useState(null);
  const [sessionId, setSessionId] = useState("");
  const [isSessionCreated, setIsSessionCreated] = useState(false);

  const generateQRCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/create-session",
        {
          facultyId: "F001",
          courseName: "Course 101",
        }
      );
      const qrCodeDataUrl = response.data.qrCode;
      setSessionId(response.data.sessionId);
      localStorage.setItem('sessionid', response.data.sessionId)
      setQrImage(qrCodeDataUrl);
      setIsSessionCreated(true);
    } catch (error) {
      console.error("Error generating session QR code", error);
    }
  };

  return (
    <>
      <AdminNavBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(to right, #74ebd5, #ACB6E5)", // Background Gradient
        }}
      >
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

            <Typography variant="h6" color="textSecondary" gutterBottom>
              Generate Session QR Code
            </Typography>

            {/* Generate QR Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={generateQRCode}
              disabled={isSessionCreated}
              sx={{
                mt: 2,
                px: 3,
                py: 1,
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              {isSessionCreated ? "Session Created" : "Generate QR Code"}
            </Button>

            {/* Display Generated QR Code */}
            {qrImage && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Generated QR Code for Session:
                </Typography>
                <img
                  src={qrImage}
                  alt="Generated QR Code"
                  style={{
                    width: "200px",
                    height: "200px",
                    margin: "10px auto",
                    display: "block",
                    borderRadius: "10px",
                    boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
                  }}
                />
                <Typography color="textSecondary">
                  Scan this code to mark attendance
                </Typography>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default AdminHome;
