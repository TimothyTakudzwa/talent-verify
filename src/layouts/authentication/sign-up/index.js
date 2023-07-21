
import React, { useState } from "react";
import { TextField, Button, CircularProgress, Alert, Collapse, IconButton, Grid } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { login } from "services/auth";
import CoverLayout from "layouts/authentication/components/CoverLayout";

import curved9 from "assets/images/curved-images/curved-6.jpg";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import { createCompany } from "services/company";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';



function SignUp() {
  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", registration_number: "", date_of_registration: "", contact_person: "", contact_phone: "", number_of_employees: "", address:"" });
  const [userData, setUserData] = useState({ username: "", password: "", company: "", phone_number: "", password2: ""  });
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState('1');
  
  
  const [alertContent, setAlertContent] = useState('');
  // const { register, handleSubmit, reset, control, setValue } = useForm();
  
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
  const [passwordError, setPasswordError] = useState("");
  const [password2Error, setPassword2Error] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;
  
    if (userData.password !== userData.password2) {
      setPassword2Error("Passwords do not match.");
      valid = false;
    } else {
      setPassword2Error("");
    }
    
    // Password complexity checks
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(userData.password)) {
      setPassword2Error("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.");
      valid = false;
    } else {
      console.log("Password is valid");
      setPassword2Error("");
    }
  
    return valid;
  };

  const handleUserRegistration = async (event) => {
    event.preventDefault();
    console.log("Form submitted:", userData);
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      // Make the API request to register user
      // const response = await login(userData.username, userData.password);
      // console.log("Registration response:", response);
      // localStorage.setItem("token", response.access);
      // localStorage.setItem("refresh", response.refresh);
      // localStorage.setItem("username", userData.username);
      // setStage('2');
      // setIsLoading(false);
      
      // // Add a 2 seconds delay (2000 milliseconds)
      // await new Promise((resolve) => setTimeout(resolve, 2000));
  
      // Optionally, you can set the alert to false after the delay
      setAlert(false);
  
      // Add your login logic here (e.g., API call, validation, etc.)
    } catch (error) {
      setAlertContent('Registration Failed');
      setAlert(true);
      console.error("An error occurred during registration:", error.response);
  
      if (error.response && error.response.data) {
        // Loop through the error response and display the error message
        for (const [key, value] of Object.entries(error.response.data)) {
          // Convert key to title case
          const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
          console.log(capitalizedKey);
          console.log(`${capitalizedKey}: ${value}`);
          setAlertContent(`${capitalizedKey}: ${value}`);
          setAlert(true);
          await new Promise((resolve) => setTimeout(resolve, 2000));
  
          // Optionally, you can set the alert to false after the delay
          setAlert(false);
        }
      }
      setIsLoading(false);
    }
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);

    
    setIsLoading(true);
    try {
      // Make the API request to create company 
      const response = await createCompany(formData);
      console.log("Registration response:", response);
      localStorage.setItem("company", response.id);
      setStage('2');
      setIsLoading(false);
  
      // Add a 2 seconds delay (2000 milliseconds)
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      // Optionally, you can set the alert to false after the delay
      setAlert(false);
  
      // Add your login logic here (e.g., API call, validation, etc.)
    } catch (error) {
      setAlertContent('Registration Failed');
      setAlert(true);
      console.error("An error occurred during registration:", error.response);
  
      if (error.response && error.response.data) {
        // Loop through the error response and display the error message
        for (const [key, value] of Object.entries(error.response.data)) {
          // Convert key to title case
          const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
          console.log(capitalizedKey);
          console.log(`${capitalizedKey}: ${value}`);
          setAlertContent(`${capitalizedKey}: ${value}`);
          setAlert(true);
          await new Promise((resolve) => setTimeout(resolve, 2000));
  
          // Optionally, you can set the alert to false after the delay
          setAlert(false);
        }
      }
      setIsLoading(false);
    }
  };
  return (
    
    <>
    
    <CoverLayout
      title="Register Company"
      description="To get started please enter your details below."
      image={curved9}
    >
      <Collapse in={alert}>{alertComponent}</Collapse>
      {stage === '2' ? 
      <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Company Name
            </SoftTypography>
            
            <TextField
            required
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Company Address
            </SoftTypography>
            <TextField
            required
              fullWidth
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Registration Date
            </SoftTypography>
            <TextField
            required
              fullWidth
              name="date_of_registration"
              value={formData.date_of_registration}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
   
          </Grid>
          <Grid item xs={12} sm={6}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Registration Number
            </SoftTypography>
            <TextField
            required
              fullWidth
              name="registration_number"
              value={formData.registration_number}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Contact Person
            </SoftTypography>
            <TextField
            required
              fullWidth
              name="contact_person"
              value={formData.contact_person}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Contact Phone Number
            </SoftTypography>
            <TextField
            required
              fullWidth
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Company Email
            </SoftTypography>
            <TextField
            required
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Number of Employees
            </SoftTypography>
            <TextField
            required
              fullWidth
              name="number_of_employees"
              value={formData.number_of_employees}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Grid>
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
      : stage === '1' ? 
      <form onSubmit={handleUserRegistration}>
      <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Username
            </SoftTypography>
            
            <TextField
            required
              fullWidth
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Phone Number
            </SoftTypography>
            <TextField
            required
              fullWidth
              name="phone_number"
              value={userData.phone_number}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
            <TextField
            required
              fullWidth
              name="password"
              value={userData.password}
              type = "password"
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              error={password2Error !== ""}
              helperText={password2Error}
            />
   
          </Grid>
          <Grid item xs={12} sm={6}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Confirm Password
            </SoftTypography>
            <TextField
            required
              fullWidth
              name="password2"
              type = "password"
              value={userData.password2}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Grid>
       
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
      : null}
    </CoverLayout>
    
    </>
  );
}

export default SignUp;