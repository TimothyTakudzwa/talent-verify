import axios from "axios";

export function createCompany(formData) {

//  handle response 400
return axios.post("http://127.0.0.1:8000/api/v1/company/", formData, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
}).then((response) => {
    console.log(response);
    return response.data;
});

}
