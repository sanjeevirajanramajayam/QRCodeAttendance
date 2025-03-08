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

function AdminNavBar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("role");
    navigate("/");
  }
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography>Admin Dashboard</Typography>
        <Content>
          <Button variant="filled" onClick={() => {navigate('/admin')}}>Create QR Code</Button>
          <Button variant="filled" onClick={() => {navigate('/admin-attendence')}}>Attendence</Button>
          <Button variant="filled" onClick={logout}>
            Logout
          </Button>
          <Avatar>A</Avatar>
        </Content>
      </StyledToolbar>
    </AppBar>
  );
}

export default AdminNavBar;
