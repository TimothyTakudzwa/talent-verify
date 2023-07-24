import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import {
  DataGrid, GridToolbar, GridToolbarContainer,
  GridToolbarFilterButton, GridToolbarExport
} from "@mui/x-data-grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import TextField from '@mui/material/TextField';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';







import { getEmployees, getDepartments } from "services/company";

// EmployeesTable component displays a DataGrid with online employee data
function EmployeesTable() {
  // Define the columns for the DataGrid
  const onlineColumns = [
    { field: 'id', headerName: 'ID', flex: 0.5, headerClassName: 'super-app-theme--header' },
    { field: 'name', headerName: 'Full name', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'company', headerName: 'Company', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'department', headerName: 'Department', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'role', headerName: 'Role', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'date_started', headerName: 'Date started', flex: 1, headerClassName: 'super-app-theme--header' },
    // { field: 'date_ended', headerName: 'Date ended', flex: 1, headerClassName: 'super-app-theme--header' },
    // { field: 'id_number', headerName: 'ID number', flex: 1, headerClassName: 'super-app-theme--header' },
  ];

  // State to store online employee data
  const [onlineRows, setOnlineRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [createEmployeeModalOpen, setCreateEmployeeModalOpen] = React.useState(false);
  const [viewEmployeeModalOpen, setViewEmployeeModalOpen] = React.useState(false);
  const [excelModalOpen, setExcelModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [employeeData, setEmployeeData] = useState({
    name: "",
    department: "",
    role: "",
    date_started: "",
    date_ended: "",
    id_number: "",
    duties: "",
  });

  const [departments, setDepartments] = useState([]);

  const fetchOnlineEmployees = async () => {
    try {
      const response = await getEmployees();
      setOnlineRows(response);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const closeModals = () => {
    setCreateEmployeeModalOpen(false);
    setViewEmployeeModalOpen(false);
    setExcelModalOpen(false);
    // setCsvModalOpen(false);
  };

  const fetchOnlineDepartments = async () => {
    try {
      const response = await getDepartments();
      setDepartments(response);
      console.log(response);
      // setOnlineRows(response);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    // Fetch online employee data and update the state

    fetchOnlineDepartments();
    fetchOnlineEmployees();
  }, []);
  const buttonStyle = {
    boxShadow: 3,
    mr: 2,
    color: '#344767',
  };

  const toolBarStyle = {
    boxShadow: 3,
    borderRadius: 2,
    mr: 2,
    mb: 2,
    color: '#344767',
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

  const csvModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    p: 4,
  };
  const handleCreateEmployee = (e) => {
    console.log(employeeData);
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer p={3}>
        {/* <GridToolbarColumnsButton /> */}
        <GridToolbarFilterButton p={3} sx={toolBarStyle} variant="outlined" />
        {/* <GridToolbarDensitySelector /> */}
        <GridToolbarExport sx={toolBarStyle} variant="outlined" />
      </GridToolbarContainer>
    );
  }


  return (
    <Card>
      <SoftBox justifyContent="space-between" p={3}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="outlined" onClick={() => setCreateEmployeeModalOpen(true)} sx={buttonStyle}>
            <AddIcon />
            Create Employee
          </Button>
          {/* Create Employee Modal */}
          {createEmployeeModal(createEmployeeModalOpen, style, closeModals, buttonStyle, employeeData, setEmployeeData, departments, handleCreateEmployee, isLoading)}
          <Button variant="outlined" startIcon={<CloudUploadIcon />} sx={buttonStyle} onClick={() => setCsvModalOpen(true)}>
            Upload from CSV
          </Button>

          <Button variant="outlined" startIcon={<CloudUploadIcon />} sx={buttonStyle} onClick={() => setExcelModalOpen(true)}>
            Upload from Excel
          </Button>
          <Button variant="outlined" startIcon={<CloudUploadIcon />} sx={buttonStyle}>
            Upload from Text
          </Button>
        </Stack>
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
            slots={{ toolbar: CustomToolbar, }}
            slotProps={{
              columnMenu: { background: 'red', color: 'white' },
            }}
            onRowClick={(e) => {
              setEmployeeData(e.row);
              console.log(e.row);
              setViewEmployeeModalOpen(true)
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

          />
          {viewEmployeeModal(viewEmployeeModalOpen, style, closeModals, buttonStyle, employeeData, setEmployeeData, departments, handleCreateEmployee, isLoading)}
        </SoftBox>
      </div>
    </Card>
  );
}

function createEmployeeModal(createEmployeeModalOpen, style, closeModals, buttonStyle, employeeData, setEmployeeData, departments, handleCreateEmployee, isLoading) {
  return <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={createEmployeeModalOpen}
    // onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={createEmployeeModalOpen}>
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {/* Add a plus icon */}
            Create Employee
          </Typography>
          <Button variant="outlined" onClick={closeModals} sx={buttonStyle}>
            <CloseIcon />
          </Button>
        </Box>


        <form>
          {/* <label htmlFor="name">Name</label> */}
          <Stack direction="row">
            <FormControl sx={{ flexGrow: 1 }}>
              <TextField
                id="name"
                name="name"
                type="text"
                label="Employee Name"
                value={employeeData.name}
                onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })}
                variant="outlined"
                // margin="normal"
                sx={{
                  mt: 3,
                  mr: 2,
                  "& label": {
                    fontSize: "14px",
                  },
                }} />
            </FormControl>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="demo-simple-select-helper-label" sx={{ fontSize: 14 }}>Department</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Department"
                value={employeeData.department}
                onChange={(e) => setEmployeeData({ ...employeeData, department: e.target.value })}
                // onChange={handleDepartmentChange}
                variant="outlined"
                margin="normal"
                sx={{
                  mt: 3,
                  width: "100%",
                  mr: 2,
                  "& label": {
                    fontSize: "14px",
                  },
                }}
              >
                <MenuItem value="create">
                  <AddIcon /> Create New Department
                </MenuItem>
                {departments.map((department) => (
                  <MenuItem key={department.id} value={department.id}>
                    {department.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row">
            <FormControl sx={{ flexGrow: 1 }}>
              <TextField
                id="id_number"
                name="id_number"
                type="text"
                label="ID Number"

                value={employeeData.id_number}
                onChange={(e) => setEmployeeData({ ...employeeData, id_number: e.target.value })}
                variant="outlined"
                // margin="normal"
                sx={{
                  mt: 3,
                  mr: 2,
                  "& label": {
                    fontSize: "14px",
                  },
                }} />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <InputLabel id="demo-simple-select-helper-label" sx={{ fontSize: 14 }}>Date Started</InputLabel>
              <TextField
                id="date_started"
                name="date_started"
                type="date"
                // label="Date Started"
                // value={employeeData.date_started}
                onChange={(e) => setEmployeeData({ ...employeeData, date_started: e.target.value })}
                variant="outlined"
                // margin="normal"
                sx={{
                  mt: 3,
                  mr: 2,
                  "& label": {
                    fontSize: "14px",
                  },
                }} />
            </FormControl>
          </Stack>
          <Stack direction="row">
            <FormControl sx={{ flexGrow: 1 }}>
              <TextField
                id="role"
                name="role"
                type="text"
                label="Current Role"

                value={employeeData.role}
                onChange={(e) => setEmployeeData({ ...employeeData, role: e.target.value })}
                variant="outlined"
                // margin="normal"
                sx={{
                  mt: 3,
                  mr: 2,
                  "& label": {
                    fontSize: "14px",
                  },
                }} />
            </FormControl>

          </Stack>
          <Stack direction="row">
            <FormControl sx={{ flexGrow: 1 }}>
              <TextField
                id="duties"
                name="duties"
                type="text"
                label="Duties"
                rows={4}
                multiline
                value={employeeData.duties}
                onChange={(e) => setEmployeeData({ ...employeeData, duties: e.target.value })}
                variant="outlined"
                // margin="normal"
                sx={{
                  mt: 3,
                  mr: 2,
                  "& label": {
                    fontSize: "14px",
                  },
                }} />
            </FormControl>

          </Stack>


          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateEmployee}
            sx={{ mt: 3, width: '100%' }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Create Employee"}
          </Button>

        </form>
      </Box>
    </Fade>
  </Modal>;
}

function viewEmployeeModal(viewEmployeeModalOpen, style, closeModals, buttonStyle, employeeData, setEmployeeData, departments, handleCreateEmployee, isLoading) {
  return <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    open={viewEmployeeModalOpen}
    // onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={viewEmployeeModalOpen}>
      <Box sx={style}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {/* Add a plus icon */}
            View/Edit Employee
          </Typography>
          <Button variant="outlined" onClick={closeModals} sx={buttonStyle}>
            <CloseIcon />
          </Button>
        </Box>


        <form>
          {/* <label htmlFor="name">Name</label> */}
          <Stack direction="row">
            <FormControl sx={{ flexGrow: 1 }}>
              <TextField
                id="name"
                name="name"
                type="text"
                label="Employee Name"
                value={employeeData.name}
                onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })}
                variant="outlined"
                // margin="normal"
                sx={{
                  mt: 3,
                  mr: 2,
                  "& label": {
                    fontSize: "14px",
                  },
                }} />
            </FormControl>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="demo-simple-select-helper-label" sx={{ fontSize: 14 }}>Department</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Department"
                value={employeeData.department}
                onChange={(e) => setEmployeeData({ ...employeeData, department: e.target.value })}
                // onChange={handleDepartmentChange}
                variant="outlined"
                margin="normal"
                sx={{
                  mt: 3,
                  width: "100%",
                  mr: 2,
                  "& label": {
                    fontSize: "14px",
                  },
                }}
              >
                <MenuItem value="create">
                  <AddIcon /> Create New Department
                </MenuItem>
                {departments.map((department) => (
                  <MenuItem key={department.id} value={department.id}>
                    {department.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row">
            <FormControl sx={{ flexGrow: 1 }}>
              <TextField
                id="id_number"
                name="id_number"
                type="text"
                label="ID Number"

                value={employeeData.id_number}
                onChange={(e) => setEmployeeData({ ...employeeData, id_number: e.target.value })}
                variant="outlined"
                // margin="normal"
                sx={{
                  mt: 3,
                  mr: 2,
                  "& label": {
                    fontSize: "14px",
                  },
                }} />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <InputLabel id="demo-simple-select-helper-label" sx={{ fontSize: 14 }}>Date Started</InputLabel>
              <TextField
                id="date_started"
                name="date_started"
                type="date"
                // label="Date Started"
                // value={employeeData.date_started}
                onChange={(e) => setEmployeeData({ ...employeeData, date_started: e.target.value })}
                variant="outlined"
                // margin="normal"
                sx={{
                  mt: 3,
                  mr: 2,
                  "& label": {
                    fontSize: "14px",
                  },
                }} />
            </FormControl>
          </Stack>
          <Stack direction="row">
            <FormControl sx={{ flexGrow: 1 }}>
              <TextField
                id="role"
                name="role"
                type="text"
                label="Current Role"

                value={employeeData.role}
                onChange={(e) => setEmployeeData({ ...employeeData, role: e.target.value })}
                variant="outlined"
                // margin="normal"
                sx={{
                  mt: 3,
                  mr: 2,
                  "& label": {
                    fontSize: "14px",
                  },
                }} />
            </FormControl>

          </Stack>
          <Stack direction="row">
            <FormControl sx={{ flexGrow: 1 }}>
              <TextField
                id="duties"
                name="duties"
                type="text"
                label="Duties"
                rows={4}
                multiline
                value={employeeData.duties}
                onChange={(e) => setEmployeeData({ ...employeeData, duties: e.target.value })}
                variant="outlined"
                // margin="normal"
                sx={{
                  mt: 3,
                  mr: 2,
                  "& label": {
                    fontSize: "14px",
                  },
                }} />
            </FormControl>

          </Stack>


          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateEmployee}
            sx={{ mt: 3, width: '100%' }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Create Employee"}
          </Button>

        </form>
      </Box>
    </Fade>
  </Modal>;
}

// Employees component displays the Dashboard layout with the EmployeesTable
function Employees() {
  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <SoftBox py={3}>
        <SoftBox mb={3} sx={{

          width: '100%',
          '& .super-app-theme--header': {
            backgroundColor: '#344767',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            color: '#ffffff',
          },
        }}>
          {/* Render the EmployeesTable component */}
          <EmployeesTable />
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Employees;
