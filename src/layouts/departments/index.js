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


import { getDepartments } from "services/company";

// DepartmentsTable component displays a DataGrid with online employee data
function DepartmentsTable() {
  // Define the columns for the DataGrid
  const onlineColumns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Full name', flex: 1 },

  ];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [departmentName, setDepartmentName] = useState("");

  // State to store online employee data
  const [onlineRows, setOnlineRows] = useState([]);

  useEffect(() => {
    // Fetch online employee data and update the state
    const fetchOnlineDepartments = async () => {
      try {
        const response = await getDepartments();
        setOnlineRows(response);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchOnlineDepartments();
  }, []);

  const handleCreateDepartment = () => {
    // Perform your create department action here with departmentName
    console.log("Creating department with name:", departmentName);

    // After the action is performed, close the modal
    handleClose();
  };

  return (
    <Card>
      <SoftBox justifyContent="space-between" p={3}>

        <Button onClick={handleOpen}>Create Department</Button>
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
                  Create Department
                </Button>
              </form>
            </Box>
          </Fade>
        </Modal>

      </SoftBox>
      <div style={{ width: '100%' }}>
        <SoftBox
          sx={{
            "& .MuiTableRow-root:not(:last-child)": {
              "& td": {
                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              },
            },
          }}
        >
          <DataGrid
            rows={onlineRows}
            columns={onlineColumns}
            slots={{ toolbar: GridToolbar }}
            filterModel={{
              items: [{ columnField: 'firstName', operatorValue: 'contains', value: '' }],
            }}
            onFilterModelChange={(model) => {
              // You can handle the filtering logic here if needed
              console.log('Filtering model changed:', model);
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50, 100]}
            checkboxSelection
          />
        </SoftBox>
      </div>
    </Card>
  );
}
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
        <SoftBox mb={3}>
          {/* Render the DepartmentsTable component */}
          <DepartmentsTable />
        </SoftBox>
      </SoftBox>

    </DashboardLayout>
  );
}

export default Departments;
