import React, { useState } from "react";
import axios from "axios";
import { Scanner } from "@yudiel/react-qr-scanner";

function MainPage() {
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
                    <h2>Scan QR Code to Mark Attendance</h2>
                    <Scanner
                        delay={300}
                        styles={{container: { width: '50%' }}}
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

export default MainPage;
