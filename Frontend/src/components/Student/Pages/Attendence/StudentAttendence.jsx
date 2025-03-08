import React, { useEffect, useState } from "react";
import StudentNavBar from "../../NavBar/StudentNavBar";
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
    axios
      .post("http://localhost:5000/get-attendence", {
        id: localStorage.getItem("id"),
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data.sessions);
      });
  }, []);
  return (
    <>
      <StudentNavBar />
      {data.sessions.map((element, index) => {
        <p>{element.course_name}</p>;
      })}
      <TableContainer component={Paper} style={{ marginTop: 24 }}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Faculty </TableCell>
              <TableCell align="right">Course Code</TableCell>
              <TableCell align="right">TimeStamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default StudentAttendence;
