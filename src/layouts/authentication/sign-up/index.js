import React, { useState } from "react";
import { TextField, Button, CircularProgress, Alert, Collapse, IconButton, Grid } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

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
  const [formData, setFormData] = useState({ name: "", email: "", registration_number: "", date_of_registration: "", contact_person: "", contact_number: "", number_of_employees: "", address:"" });
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
      // Make the API request to create company 
      response = await createCompany(formData);
      console.log("Registration response:", response);
      setIsLoading(false);
    } catch (error) {
      setAlertContent('Registration Failed');
      setAlert(true);
      console.error("An error occurred during registration:", error);
      setIsLoading(false);
    }
    // add 2 seconds delay

    // setAlert(false);
    // Add your login logic here (e.g., API call, validation, etc.)
  };

  return (
    <CoverLayout
      title="Register Company"
      description="To get started please enter your details below."
      image={curved9}
    >
      <Collapse in={alert}>{alertComponent}</Collapse>

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
              name="contact_number"
              value={formData.contact_number}
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
    </CoverLayout>
  );
}

export default SignUp;
