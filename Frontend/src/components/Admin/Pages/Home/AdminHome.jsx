import React, { useState } from "react";
import axios from "axios";

function AdminHome() {
  const [qrImage, setQrImage] = useState(null);
  const [sessionId, setSessionId] = useState('');
  const [isSessionCreated, setIsSessionCreated] = useState(false);

  const generateQRCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/create-session', {
        facultyId: 'F001', // Replace with the actual faculty ID
        courseName: 'Course 101', // Replace with actual course name
      });
      const qrCodeDataUrl = response.data.qrCode; // Get the base64-encoded QR code
      setSessionId(response.data.sessionId); // Store the session ID
      setQrImage(qrCodeDataUrl); // Store the QR code image data
      setIsSessionCreated(true); // Mark that session is created
    } catch (error) {
      console.error("Error generating session QR code", error);
    }
  };

  return (
    <>
      <div>
        <h1>QR Code Attendance System</h1>

        <div>
          <h2>Generate Session QR Code</h2>
          <button onClick={generateQRCode} disabled={isSessionCreated}>
            {isSessionCreated ? "Session Created" : "Generate Session QR Code"}
          </button>
        </div>

        {qrImage && (
          <div>
            <h3>Generated QR Code for Session:</h3>
            <img src={qrImage} alt="Generated QR Code" />
            <p>Scan this code to mark attendance</p>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminHome