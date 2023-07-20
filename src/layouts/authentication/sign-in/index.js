

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Talent Verify React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { Card, CardContent, Typography, TextField, Button, InputLabel } from '@mui/material';


// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";


// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    // Add your login logic here (e.g., API call, validation, etc.)
  };

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your username and password to sign in"
      image={curved9}
    >
     

     <Card>
      <CardContent>
        
        <form onSubmit={handleSubmit}>
        <SoftTypography component="label" variant="caption" fontWeight="bold">
              Username
            </SoftTypography>
          <TextField
            fullWidth
           
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
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
            margin="normal"
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
     
      
    </CoverLayout>
  );
}

export default SignIn;
