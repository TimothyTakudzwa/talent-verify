import React, { useState } from "react";
import { TextField, Button, CircularProgress, Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

import { login } from "services/auth";
import CoverLayout from "layouts/authentication/components/CoverLayout";

import curved9 from "assets/images/curved-images/curved-6.jpg";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";



function SignUp() {
  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const navigate = useNavigate();
  
  const alertComponent = (<Alert severity='error' action={
    <IconButton
      aria-label="close"
      color="inherit"
      size="small"
      onClick={() => {
        setAlert(false);
      }}
    >
      <CloseIcon fontSize="inherit" />
    </IconButton>
  }>{alertContent}</Alert>);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  
  const [alert, setAlert] = useState(false);
    

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
    setIsLoading(true);
    try {
      // Make the API request to login
      const response = await login(formData.username, formData.password);
      console.log("Login response:", response);
      localStorage.setItem("token", response.access);
      // Redirect to the dashboard
      navigate('/dashboard', { replace: true });
      
      // Show an alert if response.status is 200 (You can use MUI Alert here)
      setIsLoading(false);
    } catch (error) {
      setAlertContent('Invalid Username or Password');
      setAlert(true);
      console.error("An error occurred during login:", error);
      setIsLoading(false);
    }
    // add 2 seconds delay
    
    // setAlert(false);
    // Add your login logic here (e.g., API call, validation, etc.)
  };

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your username and password to sign in"
      image={curved9}
    >
      <Collapse in={alert}>{ alertComponent }</Collapse>
      
      <form onSubmit={handleSubmit}>
      <SoftTypography component="label" variant="caption" fontWeight="bold">
              Username
            </SoftTypography>
        <TextField
          fullWidth
          name="username"
          value={formData.username}
          onChange={handleInputChange}
         
          variant="outlined"
          margin="normal"
        />
        <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
        <TextField
          fullWidth
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          type="password"
          
          variant="outlined"
          margin="normal"
        />
        {/* Add space */}
        <SoftBox mb={2} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </form>
    </CoverLayout>
  );
}

export default SignUp;
