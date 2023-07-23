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
import Stack from "@mui/material/Stack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";


// CircularProgress
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';



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
  // const handleClose = () => setOpen(false);
  
  const [departmentName, setDepartmentName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [csvModalOpen, setCsvModalOpen] = useState(false);
  const handleClose = () => {
    setCsvModalOpen(false);
  };
  const [csvModal2Open, setCsvModal2Open] = useState(false);
  const [csvFile, setCsvFile] = useState(null);



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

  const handleUploadCsv = () => {
    if (!csvFile) {
      console.log("No CSV file selected");
      return;
    }

    // Here, you can perform the CSV file upload action using 'csvFile'
    console.log("Uploading CSV file:", csvFile);

    // Reset the file input after uploading
    setCsvFile(null);
  };


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
  const buttonStyle = {
    boxShadow: 3,
    mr: 2,
    color: '#344767',
  };
  const fileReader = new FileReader();
  const [array, setArray] = useState([]);
  const [csvDepartments, setCsvDepartments] = useState([]);
  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
    console.log(array);
  };



  const handleCsvFileChange = (event) => {
    const file = event.target.files[0];
    setCsvFile(file);
    // console.log("CSV file selected:", file);
    fileReader.onload = function (event) {
      const text = event.target.result;
      csvFileToArray(text);
    };

    fileReader.readAsText(file);
    console.log(array);
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      const firstKey = Object.keys(array[i])[0];
      const secondKey = Object.keys(array[i])[1];
      const firstValue = array[i][firstKey];
      const secondValue = array[i][secondKey];


      newArray.push({ id: firstValue, name: secondValue });
    }
    // console.log(newArray);
    setCsvDepartments(newArray);
    console.log(csvDepartments);
    setCsvModal2Open(true);


    // print the file object on the console

  };

  const handleCsvModalClose = () => {
    setCsvModalOpen(false);
  };

  return (
    <Card>
      <SoftBox justifyContent="space-between" p={2}>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="outlined" onClick={handleOpen} sx={buttonStyle}>
            <AddIcon />
            Create Department
          </Button>
          <Button variant="outlined" startIcon={<CloudUploadIcon />} sx={buttonStyle} onClick={() => setCsvModalOpen(true)}>
            Upload from CSV
          </Button>

          <Button variant="outlined" startIcon={<CloudUploadIcon />} sx={buttonStyle}>
            Upload from Excel
          </Button>
          <Button variant="outlined" startIcon={<CloudUploadIcon />} sx={buttonStyle}>
            Upload from Text
          </Button>
        </Stack>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={csvModalOpen}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={csvModalOpen}>
            <Box sx={style}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Upload Departments from CSV
                </Typography>
                <Button variant="outlined" onClick={handleClose} sx={buttonStyle}>
                  <CloseIcon />
                </Button>
              </Box>
              <form>

                <TextField
                  id="department-name"
                  type="file"

                  variant="outlined"
                  fullWidth
                  value={departmentName}
                  onChange={handleCsvFileChange}
                  inputProps={{ accept: ".csv, text/csv" }}
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
        <Modal
          open={csvModal2Open}
          onClose={() => setCsvModal2Open(false)}
          aria-labelledby="csv-upload-modal-title"
        >
          <Box sx={csvModalStyle}>
            <Typography id="csv-upload-modal-title" variant="h6" component="h2">
              Departments from CSV File
            </Typography>
            <DataGrid
              // padding={10}

              rows={onlineRows}
              columns={onlineColumns}
              // slots={{ toolbar: GridToolbar }}

              onFilterModelChange={(model) => {

                console.log('Filtering model changed:', model);
              }}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 20, 50, 100]}
            // checkboxSelection
            />
            {/* <DataGrid
            columns={onlineColumns}
            rows={csvDepartments}           

          <List>
            {csvDepartments.map((dept, index) => (
              <ListItem key={index}>
                <ListItemText primary={`ID: ${dept[Object.keys(dept)[0]]}, Name: ${dept[Object.keys(dept)[1]]}`} />
              </ListItem>
            ))}
          </List> */}

            <Button
              variant="contained"
              color="primary"
              onClick={() => setCsvModal2Open(false)}
            >
              Close
            </Button>
          </Box>
        </Modal>


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
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50, 100]}
          // checkboxSelection
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

const csvModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
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
