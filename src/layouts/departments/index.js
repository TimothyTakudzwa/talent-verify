import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// CircularProgress
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


import { getDepartments, createDepartment } from "services/company";
const MySwal = withReactContent(Swal)
// DepartmentsTable component displays a DataGrid with online employee data
function DepartmentsTable() {
  // Define the columns for the DataGrid
  const onlineColumns = [
    { field: 'id', headerName: 'ID', flex: 1, headerClassName: 'super-app-theme--header', },
    { field: 'name', headerName: 'Department name', flex: 1, headerClassName: 'super-app-theme--header', },

  ];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [departmentName, setDepartmentName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // State to store online employee data
  const [onlineRows, setOnlineRows] = useState([]);

  const fetchOnlineDepartments = async () => {
    try {
      const response = await getDepartments();
      setOnlineRows(response);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  useEffect(() => {
    // Fetch online employee data and update the state

    fetchOnlineDepartments();
  }, []);

  const handleCreateDepartment = async () => {
    setIsLoading(true);
    console.log(departmentName);
    console.log("Form submitted:", localStorage.getItem("company"));
    const data = {
      name: departmentName,
      company: 1
    }
    try {
      const response = await createDepartment(data);
      console.log("Create Department response:", response);
      MySwal.fire(
        'Success!',
        'Department created successfully!',
        'success'
      )
    }
    catch (error) {
      MySwal.fire(
        'Error!',
        'Department could not be created!',
        'error'
      );
      console.error("Error creating department:", error);
    }
    fetchOnlineDepartments();
    setIsLoading(false);
    setDepartmentName("");
    handleClose();


  };

  return (
    <Card>
      <SoftBox justifyContent="space-between" p={2}>

        <Button onClick={handleOpen} sx={buttonStyle}> <AddIcon/> Create Department</Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                {/* Add a plus icon */}
                Create Department
              </Typography>


              <form>

                <TextField
                  id="department-name"
                  label="Department Name"
                  variant="outlined"
                  fullWidth
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  sx={{
                    mt: 3,
                    "& label": {
                      fontSize: "14px", // Adjust the font size as needed
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreateDepartment}
                  sx={{ mt: 3, width: '100%' }}
                >
                  {isLoading ? <CircularProgress size={24} /> : "Create Department"}
                </Button>
              </form>
            </Box>
          </Fade>
        </Modal>

      </SoftBox>
      <div style={{ width: '100%' }}>
        <SoftBox
          sx={{
            padding: 2,
            
            "& .MuiTableRow-root:not(:last-child)": {
              "& td": {
                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              },
            },
          }}
        >
          <DataGrid 
          // padding={10}
          
            rows={onlineRows}
            columns={onlineColumns}
            slots={{ toolbar: GridToolbar }}

            onFilterModelChange={(model) => {

              console.log('Filtering model changed:', model);
            }}
           autoPageSize
          />
        </SoftBox>
      </div>
    </Card>
  );
}

const buttonStyle = {
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};
// Departments component displays the Dashboard layout with the DepartmentsTable
function Departments() {

  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <SoftBox py={3}>
        <SoftBox mb={3} sx={{
       
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: '#344767',
          color: '#ffffff',
        },
      }}>
          {/* Render the DepartmentsTable component */}
          <DepartmentsTable />
        </SoftBox>
      </SoftBox>

    </DashboardLayout>
  );
}

export default Departments;