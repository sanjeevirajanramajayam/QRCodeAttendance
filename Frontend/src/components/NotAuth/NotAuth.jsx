import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotAuth() {
  const navigate = useNavigate()
  return (
    <Container
      maxWidth="xs" 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          padding: 3,
          borderRadius: 2,
          backgroundColor: 'white',
          boxShadow: 3,
          width: '100%',
        }}
      >
        <Typography variant="h4" color="error" gutterBottom>
          Access Denied
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          You do not have permission to view this page.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
}

export default NotAuth;
