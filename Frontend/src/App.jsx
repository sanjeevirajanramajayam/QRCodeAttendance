import React, { useState } from "react";
import axios from "axios";
import { Scanner } from "@yudiel/react-qr-scanner";
import AppRoute from "./Routes/AppRoute";
function App() {
  const [scanResult, setScanResult] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [qrImage, setQrImage] = useState(null); // State to store the QR image data

  // Handle scanning of QR Code
  const handleScan = (data) => {
    if (data) {
      setScanResult(data[0].rawValue); // Assuming data.text is the QR code value
      markAttendance(data[0].rawValue);
      console.log(data[0].rawValue);
    }
  };

  // Handle error while scanning QR Code
  const handleError = (err) => {
    console.error(err);
  };

  // Mark attendance by sending the studentId to the backend
  const markAttendance = async (id) => {
    try {
      console.log(id);
      const response = await axios.post(
        "http://localhost:5000/mark-attendance",
        { studentId: id }
      );
      setAttendanceStatus(response.data.message);
    } catch (error) {
      console.error("Error marking attendance", error);
    }
  };

  // Generate QR Code for a student
  const generateQRCode = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/generate-qr/${studentId}`
      );
      const qrImage = response.data.qrCode; // Get the base64-encoded QR code
      setQrImage(qrImage); // Store the QR code image data
    } catch (error) {
      console.error("Error generating QR code", error);
    }
  };

  return (
    <>
      <div className="App">
        <h1>QR Code Attendance System</h1>

        {/* QR Scanner */}
        <div>
          <h2>Scan QR Code to Mark Attendance</h2>
          <Scanner
            delay={300}
            style={{ width: "20%" }}
            onError={handleError}
            onScan={(result) => handleScan(result)}
            classNames={{ onOff: false }}
          />
        </div>

        {scanResult && (
          <div>
            <h3>Attendance Marked for Student ID: {scanResult}</h3>
            <p>{attendanceStatus}</p>
          </div>
        )}

        {/* Generate QR Code */}
        <div>
          <h2>Generate QR Code for Student</h2>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter Student ID"
          />
          <button onClick={generateQRCode}>Generate QR Code</button>
        </div>

        {/* Display generated QR Code */}
        {qrImage && (
          <div>
            <h3>Generated QR Code:</h3>
            <img src={qrImage} alt="Generated QR Code" />
          </div>
        )}
      </div>
      <AppRoute/>
    </>
  );
}

export default App;
