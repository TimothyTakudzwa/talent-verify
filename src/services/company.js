import axios from "axios";

// Function to make API requests with the authorization header
const makeAuthorizedRequest = (method, url, formData = null) => {
  const token = localStorage.getItem("token");
  const config = {
    method: method,
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (formData) {
    config.data = formData;
  }

  return axios(config)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error("Error making API request:", error);
    //   throw error;
    });
};
// Create a company
export function createCompany(formData) {
    return makeAuthorizedRequest("post", "http://127.0.0.1:8000/api/v1/company/", formData);
  }
// CRUD endpoints for Employees

// Create an employee
export function createEmployee(formData) {
  return makeAuthorizedRequest("post", "http://127.0.0.1:8000/api/v1/employees/", formData);
}

// Get all employees
export function getEmployees() {
  return makeAuthorizedRequest("get", "http://127.0.0.1:8000/api/v1/employees/");
}

// Get an employee by id
export function getEmployee(id) {
  return makeAuthorizedRequest("get", `http://127.0.0.1:8000/api/v1/employees/${id}/`);
}

// Update an employee
export function updateEmployee(id, formData) {
  return makeAuthorizedRequest("put", `http://127.0.0.1:8000/api/v1/employees/${id}/`, formData);
}

// Delete an employee
export function deleteEmployee(id) {
  return makeAuthorizedRequest("delete", `http://127.0.0.1:8000/api/v1/employees/${id}/`);
}

// CRUD endpoints for Departments

// Create a department
export function createDepartment(formData) {
  return makeAuthorizedRequest("post", "http://127.0.0.1:8000/api/v1/departments/", formData);
}

// Get all departments
export function getDepartments() {
  return makeAuthorizedRequest("get", "http://127.0.0.1:8000/api/v1/departments/");
}

// Get a department by id
export function getDepartment(id) {
  return makeAuthorizedRequest("get", `http://127.0.0.1:8000/api/v1/departments/${id}/`);
}

// Update a department
export function updateDepartment(id, formData) {
  return makeAuthorizedRequest("put", `http://127.0.0.1:8000/api/v1/departments/${id}/`, formData);
}

// Delete a department
export function deleteDepartment(id) {
  return makeAuthorizedRequest("delete", `http://127.0.0.1:8000/api/v1/departments/${id}/`);
}

// CRUD endpoints for User Roles

// Create a user role
export function createUserRole(formData) {
  return makeAuthorizedRequest("post", "http://127.0.0.1:8000/api/v1/user-roles/", formData);
}

// Get all user roles
export function getUserRoles() {
  return makeAuthorizedRequest("get", "http://127.0.0.1:8000/api/v1/user-roles/");
}

// Get a user role by id
export function getUserRole(id) {
  return makeAuthorizedRequest("get", `http://127.0.0.1:8000/api/v1/user-roles/${id}/`);
}

// Update a user role
export function updateUserRole(id, formData) {
  return makeAuthorizedRequest("put", `http://127.0.0.1:8000/api/v1/user-roles/${id}/`, formData);
}

// Delete a user role
export function deleteUserRole(id) {
  return makeAuthorizedRequest("delete", `http://127.0.0.1:8000/api/v1/user-roles/${id}/`);
}
