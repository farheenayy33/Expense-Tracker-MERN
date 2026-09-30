import axios from "axios";
const BASE_URL = "https://expense-tracker-mern-eight-xi.vercel.app/api/auth";const registerUser = async (data) => {
  const response = await axios.post(`${BASE_URL}/register`, data);
  return response.data;
};
const loginUser = async (data) => {
  const response = await axios.post(`${BASE_URL}/login`, data);
  return response.data;
};

export { registerUser, loginUser };
