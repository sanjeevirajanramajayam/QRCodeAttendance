import React from 'react'
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

function Login() {
  return (
    <div className="login">
      <TextField
        label="Username"
        variant="outlined"
        type="text"
      />
      <TextField
        label="password"
        variant="outlined"
        type="password"
        sx={{ mt: 2 }}
      />
      <Button variant="contained" sx={{ mt: 2 }}>
        Login
      </Button>
    </div>
  )
}

export default Login