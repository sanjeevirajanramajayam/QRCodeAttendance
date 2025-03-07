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

import React from 'react'
import StudentNavBar from '../../NavBar/StudentNavBar'
function StudentHome() {
  return (
    <StudentNavBar/>
  )
}

export default StudentHome