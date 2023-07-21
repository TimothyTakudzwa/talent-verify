import axios from "axios";

export async function login(username, password) {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/v1/token/", {
      username,
      password,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error occurred during login:", error);
    throw error;
  }
}

export async function registerUser(formData) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/v1/user/",
      formData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error occurred during registration:", error);
    throw error;
  }
}
