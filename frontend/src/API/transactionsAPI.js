import axios from "axios";

const BASE_URL = "https://expense-tracker-mern-eight-xi.vercel.app/api/auth";
const addIncome = async (data) => {
  const response = await axios.post(`${BASE_URL}/income`, data);
  return response.data;
};

const addExpense = async (data) => {
  const response = await axios.post(`${BASE_URL}/expense`, data);
  return response.data;
};

const getTransactions = async (userId) => {
  const response = await axios.get(`${BASE_URL}/transactions`, {
    params: { userId },
  });

  return response.data;
};

export { addIncome, addExpense, getTransactions };
