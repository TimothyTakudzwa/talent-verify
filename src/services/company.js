import axios from "axios";

export function createCompany(formData) {

//   send data to http://127.0.0.1:8000/api/v1/company/ using axios.post and localStorage.getItem("token") as the token
return axios.post("http://127.0.0.1:8000/api/v1/company/", formData, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
}).then((response) => {
    console.log(response.data);
    return response.data;
});

}
