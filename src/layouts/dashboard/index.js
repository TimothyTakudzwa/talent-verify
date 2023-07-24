import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
  DataGrid, GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton
} from "@mui/x-data-grid";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import React, { useEffect, useState } from "react";

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createEmployee, deleteEmployee as deleteApi, getDepartments, getEmployees, updateEmployee } from "services/company";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)

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
  const [isCreateDepartmentModalOpen, setIsCreateDepartmentModalOpen] = React.useState(false);
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
      setOnlineRows(response.data);
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
      setDepartments(response.data);
      console.log(response);
      // setOnlineRows(response);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleCreateDepartment = async () => {
    setIsLoading(true);
    console.log(departmentName);
    console.log("Form submitted:", localStorage.getItem("company"));
    const data = {
      name: departmentName,
      company: localStorage.getItem("company")
    }
    try {
      const response = await createDepartment(data);
      console.log("Create Department response:", response);
      if (response.status === 201)
        MySwal.fire(
          'Success!',
          'Department created successfully!',
          'success'
        )
      else {
        MySwal.fire(
          'Error!',
          'Department could not be created!',
          'error'
        )
      }
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


  const deleteEmployee = async (id) => {
    setIsLoading(true);
    try {
      const response = await deleteApi(id);
      console.log(response);
      setIsLoading(false);
      setViewEmployeeModalOpen(false);
      console.log(response.status)
      fetchOnlineEmployees();
      if (response.status === 204)
        MySwal.fire(
          'Success!',
          'Employee deleted successfully!',
          'success'
        )
      else {
        MySwal.fire(
          'Error!',
          'Employee could not be deleted!',
          'error'
        )
      }
    } catch (error) {
      MySwal.fire(
        'Error!',
        'Employee could not be deleted!',
        'error'
      )
      console.error("Error deleting employee:", error);
    }
  };

  const handleCreateEmployee = async () => {
    setIsLoading(true);
    try {
      employeeData.company = localStorage.getItem("company")
      employeeData.date_ended = employeeData.date_started;
      const response = await createEmployee(employeeData);
      console.log(response);
      setIsLoading(false);
      setCreateEmployeeModalOpen(false);
      if (response.status === 201)
        MySwal.fire(
          'Success!',
          'Employee created successfully!',
          'success'
        )
      else {
        MySwal.fire(
          'Error!',
          'Employee could not be created!',
          'error'
        )
      }

      // setCreateEmployeeModalOpen(false);
      fetchOnlineEmployees();
    } catch (error) {

      MySwal.fire(
        'Error!',
        'Employee could not be created!',
        'error'
      )
      console.error("Error creating employee:", error);
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


  function CustomToolbar() {
    return (
      <GridToolbarContainer p={3}>
        {/* <GridToolbarColumnsButton /> */}
        <GridToolbarFilterButton p={3} sx={toolBarStyle} variant="outlined" />
        {/* <GridToolbarDensitySelector /> */}
        <GridToolbarExport sx={toolBarStyle} variant="outlined" />
        {/* Click on a row to view/edit employee in red  */}
        <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ color: 'red' }}>
          <i>Click on an employee to View/Edit/Delete an employee</i>
        </Typography>
      </GridToolbarContainer>
    );
  }


  return (
    <Card>
      <SoftBox justifyContent="space-between" p={3}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="outlined" onClick={() => {
            setEmployeeData({
              name: "",
              department: "",
              role: "",
              date_started: "",
              date_ended: "",
              id_number: "",
              duties: "",
            });
            if (departments.length < 1){
              MySwal.fire(
                'Error!',
                'You need to create a department first!',
                'error'
              )
            }
            else{
              setCreateEmployeeModalOpen(true)
            }
            
          }} sx={buttonStyle}>
            <AddIcon />
            Create Employee
          </Button>
          {/* Create Employee Modal */}
          {createEmployeeModal(createEmployeeModalOpen, style, closeModals, buttonStyle, employeeData, setEmployeeData, departments, handleCreateEmployee, isLoading,)}
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
              // look for the department id from departments using the department name
              const department = departments.find(department => department.name === e.row.department);
              console.log(department)
              setEmployeeData({ ...e.row, department: department })
              console.log(employeeData)
              setViewEmployeeModalOpen(true)
            }}
            onFilterModelChange={(model) => {
              // You can handle the filtering logic here if needed
              console.log('Filtering model changed:', model);
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
          // pageSizeOptions={[5, 10, 20, 50, 100]}

          />
          {viewEmployeeModal(fetchOnlineEmployees, viewEmployeeModalOpen, setViewEmployeeModalOpen, style, closeModals, buttonStyle, employeeData, setEmployeeData, departments, handleCreateEmployee, isLoading, deleteEmployee)}
        </SoftBox>
      </div>
    </Card>
  );
}

function createEmployeeModal(createEmployeeModalOpen, style, closeModals, buttonStyle, employeeData, setEmployeeData, departments, handleCreateEmployee, isLoading, handleOpen) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any validation or additional handling before creating the employee
    handleCreateEmployee();
  }
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


        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="name">Name</label> */}
          <Stack direction="row">
            <FormControl sx={{ flexGrow: 1 }}>
              <TextField
                required
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
                onChange={(e) => {
                  if (e.target.value === "create") {
                    handleOpen
                  }
                  setEmployeeData({ ...employeeData, department: e.target.value })}}
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
                required
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
                required
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
                required
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
                required
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
            type="submit"
            sx={{ mt: 3, width: '100%' }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Create Employee"}
          </Button>

        </form>
      </Box>
    </Fade>
  </Modal>;
}

function viewEmployeeModal(fetchOnlineEmployees, viewEmployeeModalOpen, setViewEmployeeModalOpen, style, closeModals, buttonStyle, employeeData, setEmployeeData, departments, handleCreateEmployee, isLoading, deleteEmployee) {
  // const defaultDepartmentId = departments.length > 0 ? departments[0].id : "1";
  const [editDepartment, setEditDepartment] = useState(false);
  const editEmployee = async () => {
    console.log(employeeData.id)
    employeeData.company = localStorage.getItem("company")
    // check if employee.department is an integer 
    if (typeof employeeData.department === 'object')
      employeeData.department = employeeData.department.id
    console.log(employeeData)
    
    // setIsLoading(true);
    var response = await updateEmployee(employeeData.id, employeeData);
    console.log(response.data);
    setViewEmployeeModalOpen(false);
    fetchOnlineEmployees()
    if (response.status === 200)
      MySwal.fire(
        'Success!',
        'Employee updated successfully!',
        'success'
      )
    else {
      MySwal.fire(
        'Error!',
        'Employee could not be updated!',
        'error'
      )
    }
    // close the modal 
    

  }
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
            {/* {!editDepartment? null : */}
            <FormControl sx={{ flexGrow: 1 }}>
              <TextField
                id="name"
                disabled
                name="name"
                type="text"
                // label="Department "
                value={employeeData.department.name}
                // onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })}
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
{/* } */}
            <FormControl sx={{ minWidth: 5 }}>
              <InputLabel id="demo-simple-select-helper-label" sx={{ fontSize: 12 }}>Edit Dept</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Department Edit"
                value={employeeData.department}
                onChange={(e) => {
                  setEditDepartment(true)
                  setEmployeeData({ ...employeeData, department: e.target.value })}}
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
                value={employeeData.date_started}
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

          <Stack direction="row">
            <Button
              variant="contained"
              color="primary"
              onClick={editEmployee}
              sx={{ mt: 3, mr: 1, width: '50%' }}
            >
              {isLoading ? <CircularProgress size={24} /> : "Edit"}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              // color="danger"
              onClick={handleCreateEmployee}
              sx={{ mt: 3, width: '50%', mr: 1, color: '#ffffff' }}
            >
              {isLoading ? <CircularProgress size={24} /> : "History"}
            </Button>
            <Button
              variant="contained"
              // color="danger"
              onClick={() => deleteEmployee(employeeData.id)}
              sx={{ mt: 3, width: '50%', backgroundColor: '#f44336', color: '#ffffff' }}
            >
              {isLoading ? <CircularProgress size={24} /> : "Delete"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Fade>
  </Modal>;
}

function createDepartmentModal(open, handleClose, departmentName, setDepartmentName, handleCreateDepartment, isLoading) {
  return <Modal
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
            }} />
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
