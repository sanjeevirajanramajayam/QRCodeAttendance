import { Typography, TextField, Paper, Button, Avatar, Container, Box, Alert, AlertTitle } from '@mui/material'
import React, { useState } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                    boxSizing: 'border-box',
                }}>
                <Container maxWidth="xs">
                    <Paper elevation={10} sx={{ padding: 2, mx: 'auto' }} square={false}>
                        <Avatar sx={{ textAlign: 'center', bgcolor: '#BF40BF', mx: 'auto' }}>
                            <LockIcon></LockIcon>
                        </Avatar>
                        <Typography variant='h4' component='h1' sx={{ textAlign: 'center', my: 2 }}><LoginIcon /> Login</Typography>
                        <TextField placeholder='Enter username' sx={{ mb: 2 }} fullWidth value={username} onChange={handleUsernameChange} error={error ? error : undefined} />
                        <TextField placeholder='Enter password' fullWidth value={password} onChange={handlePasswordChange} error={error ? error : undefined} />

                        {error && <Alert severity="error" sx={{
                            marginTop: 2
                            
                        }} variant='filled'> <Typography sx={{}}>Login Error</Typography>
                        </Alert>}

                        <Button variant="contained" sx={{ my: 2 }} fullWidth>Log In</Button>
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default Login