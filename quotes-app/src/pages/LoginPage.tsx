import React, { useState } from "react";
import { login } from "../services/apiService";
import { Button, styled, TextField, Container, Box } from "@mui/material";
import Grid from '@mui/material/Grid2'

const InputField = styled(TextField)`
  margin-bottom: 15px;
  width: 100%;
`;

interface LoginProps {
  setToken: (token: string) => void;
}

const Login = ({ setToken }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = async () => {
    try {
      const { token } = await login(username, otp);
      setToken(token);
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Container
    maxWidth="xs"
    sx={{
      display: "flex",
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      padding: 0
    }}
  >
    <Grid 
      container 
      spacing={2} 
      direction="column" 
      alignItems="center" 
      justifyContent="center"
    >
      <Grid size={12}>
        <Box
          sx={{
            boxShadow: 3,  
            borderRadius: 2, 
            padding: '15px', 
            backgroundColor: 'white', 
            maxWidth: 400, 
            marginTop: 0,
            textAlign:'center' 
          }}
        >
          <h1>Login</h1>

          <InputField
            type="text"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <InputField
            type="text"
            label="OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!username || !otp}
            fullWidth
          >
            Submit
          </Button>
        </Box>
      </Grid>
    </Grid>
  </Container>
  );
};

export default Login;
