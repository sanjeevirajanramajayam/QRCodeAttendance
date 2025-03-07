// import React, { useState } from "react";
// import axios from "axios";
// import { Scanner } from "@yudiel/react-qr-scanner";
// function StudentHome() {
//     const [scanResult, setScanResult] = useState(null);
//     const [studentId, setStudentId] = useState('');
//     const [attendanceStatus, setAttendanceStatus] = useState('');
//     const [qrImage, setQrImage] = useState(null); // State to store the QR image data


//     const generateQRCode = async () => {
//         try {
//             const response = await axios.get(
//                 `http://localhost:5000/generate-qr/${studentId}`
//             );
//             const qrImage = response.data.qrCode; // Get the base64-encoded QR code
//             setQrImage(qrImage); // Store the QR code image data
//         } catch (error) {
//             console.error("Error generating QR code", error);
//         }
//     };

//     return (
//         <>
//             <div>
//                 <h1>QR Code Attendance System</h1>

//                 <div>
//                     <h2>Generate QR Code for Student</h2>
//                     <input
//                         type="text"
//                         value={studentId}
//                         onChange={(e) => setStudentId(e.target.value)}
//                         placeholder="Enter Student ID"
//                     />
//                     <button onClick={generateQRCode}>Generate QR Code</button>
//                 </div>

//                 {/* Display generated QR Code */}
//                 {qrImage && (
//                     <div>
//                         <h3>Generated QR Code:</h3>
//                         <img src={qrImage} alt="Generated QR Code" />
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }

// export default StudentHome;

import {useState} from 'react'
import axios from 'axios';
import { Scanner } from "@yudiel/react-qr-scanner";
import StudentNavBar from '../../NavBar/StudentNavBar'

function StudentHome() {
  const [scanResult, setScanResult] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [qrImage, setQrImage] = useState(null);
  const [sessionId, setSessionId] = useState('');
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
      const studentData = { sessionId, studentId: 123223 };
      console.log(studentId)
      const response = await axios.post('http://localhost:5000/mark-attendance', studentData);
      setAttendanceStatus(response.data.message);
    } catch (error) {
      console.error("Error marking attendance", error);
      setAttendanceStatus('Failed to mark attendance');
    }
  };

  return (
    <>
      <StudentNavBar />
      <div>
        <h1>QR Code Attendance System</h1>

        <div>
          <h2>Scan QR Code to Mark Attendance</h2>
          <Scanner
            delay={300}
            styles={{ container: { width: '50%' } }}
            onError={handleError}
            onScan={handleScan}
          />
        </div>

        {scanResult && (
          <div>
            <h3>Attendance Marked for Session ID: {scanResult}</h3>
            <p>{attendanceStatus}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default StudentHome