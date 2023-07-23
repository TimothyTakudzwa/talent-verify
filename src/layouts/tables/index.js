import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { getEmployees } from "services/company";

// EmployeesTable component displays a DataGrid with online employee data
function EmployeesTable() {
  // Define the columns for the DataGrid
  const onlineColumns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Full name', flex: 1 },
    { field: 'company', headerName: 'Company', flex: 1 },
    { field: 'department', headerName: 'Department', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { field: 'date_started', headerName: 'Date started', flex: 1 },
    { field: 'date_ended', headerName: 'Date ended', flex: 1 },
    { field: 'id_number', headerName: 'ID number', flex: 1 },
  ];

  // State to store online employee data
  const [onlineRows, setOnlineRows] = useState([]);

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

  return (
    <Card>
      <SoftBox justifyContent="space-between" p={3}>
        <SoftTypography variant="h6">Employees</SoftTypography>
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

// Tables component displays the Dashboard layout with the EmployeesTable
function Tables() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          {/* Render the EmployeesTable component */}
          <EmployeesTable />
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
