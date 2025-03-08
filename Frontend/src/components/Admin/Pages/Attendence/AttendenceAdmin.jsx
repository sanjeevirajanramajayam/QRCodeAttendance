import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

function StudentAttendence() {
  const [data, setData] = useState({ sessions: [] });

  useEffect(() => {
    console.log(localStorage.getItem("sessionid"))
    axios
      .post("http://localhost:5000/get-students-by-session", {
        session_id: localStorage.getItem("sessionid"),
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data.sessions);
        console.log(response.data.timestamps);
      });
  }, []);

  function getPeriod(timestamp) {
    console.log(timestamp.toString());
    let referenceTimestamp = new Date();
    referenceTimestamp.setHours(9, 0, 0, 0);

    let currentTimestamp = new Date(timestamp);
    let differenceInMillis = currentTimestamp - referenceTimestamp;

    let period = Math.floor(differenceInMillis / 60000) + 1;

    return `Period ${period}`;
  }

  return (
    <>
      <TableContainer component={Paper} style={{ marginTop: 24 }}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Faculty</TableCell>
              <TableCell align="right">Course Code</TableCell>
              <TableCell align="right">TimeStamp</TableCell>
              <TableCell align="right">Period</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.sessions.map((session, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {session.faculty_id}
                </TableCell>
                <TableCell align="right">{session.course_name}</TableCell>
                <TableCell align="right">
                  {new Date(data.timestamps[index]).toString()}
                </TableCell>
                <TableCell align="right">
                  {getPeriod(new Date(data.timestamps[index]))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default StudentAttendence;
