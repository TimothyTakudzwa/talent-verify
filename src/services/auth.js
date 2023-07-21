import axios from "axios";

export function login(username, password){
    return axios.post("http://127.0.0.1:8000/api/v1/token/", {
        username,
        password
    }).then((response) => {
        console.log(response.data);
        
        return response.data;
    });
}