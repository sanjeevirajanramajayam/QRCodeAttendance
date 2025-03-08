import {
  AppBar,
  Avatar,
  Button,
  styled,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Content = styled("div")({
  display: "flex",
  gap: 2,
});

function StudentNavBar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("role");
    navigate("/");
  }
  return (
    <AppBar position="static">
      <StyledToolbar>
        <Typography>Student Dashboard</Typography>
        <Content>
          <Button variant="filled" onClick={() => navigate("/student-home")}>
            Scan QR Code
          </Button>
          <Button
            variant="filled"
            onClick={() => navigate("/student-attendence")}
          >
            Attendence
          </Button>
          <Button variant="filled" onClick={logout}>
            Logout
          </Button>
          <Avatar>A</Avatar>
        </Content>
      </StyledToolbar>
    </AppBar>
  );
}

export default StudentNavBar;
