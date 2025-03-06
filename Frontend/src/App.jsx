import React, { useState } from 'react';
import axios from 'axios';
import QRReader from 'react-qr-reader';

function App() {
  const [scanResult, setScanResult] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');

  // Handle scanning of QR Code
  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      markAttendance(data);
    }
  };

  // Handle error while scanning QR Code
  const handleError = (err) => {
    console.error(err);
  };

  // Mark attendance by sending the studentId to the backend
  const markAttendance = async (id) => {
    try {
      const response = await axios.post('http://localhost:5000/mark-attendance', { studentId: id });
      setAttendanceStatus(response.data.message);
    } catch (error) {
      console.error("Error marking attendance", error);
    }
  };

  // Generate QR Code for a student
  const generateQRCode = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/generate-qr/${studentId}`);
      const qrImage = response.data;
      document.getElementById('qr-container').innerHTML = qrImage;
    } catch (error) {
      console.error("Error generating QR code", error);
    }
  };

  return (
    <div className="App">
      <h1>QR Code Attendance System</h1>
      
      {/* QR Scanner */}
      <div>
        <h2>Scan QR Code to Mark Attendance</h2>
        <QRReader
          delay={300}
          style={{ width: '100%' }}
          onError={handleError}
          onScan={handleScan}
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
        <h2>Generate QR Code for Bannari Amman Students</h2>
        <input 
          type="text" 
          value={studentId} 
          onChange={(e) => setStudentId(e.target.value)} 
          placeholder="Enter Student ID" 
        />
        <button onClick={generateQRCode}>Generate QR Code</button>
      </div>

      <div id="qr-container"></div>
    </div>
  );
}

export default App;
