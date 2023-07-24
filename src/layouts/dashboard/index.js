import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { DataGrid, GridToolbar, GridToolbarContainer, 
GridToolbarFilterButton, GridToolbarExport } from "@mui/x-data-grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";



import { getEmployees } from "services/company";

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
    { field: 'date_ended', headerName: 'Date ended', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'id_number', headerName: 'ID number', flex: 1, headerClassName: 'super-app-theme--header' },
  ];

  // State to store online employee data
  const [onlineRows, setOnlineRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [excelModalOpen, setExcelModalOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    // Fetch online employee data and update the state
    const fetchOnlineEmployees = async () => {
      try {
        const response = await getEmployees();
        setOnlineRows(response);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
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
        <GridToolbarExport sx={toolBarStyle}  variant="outlined" />
      </GridToolbarContainer>
    );
  }


  return (
    <Card>
      <SoftBox justifyContent="space-between" p={3}>
      <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="outlined" onClick={handleOpen} sx={buttonStyle}>
            <AddIcon />
            Create Department
          </Button>
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
        </SoftBox>
      </div>
    </Card>
  );
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
