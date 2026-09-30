import axios from "axios";

const BASE_URL = "http://localhost:5000/api/transaction";

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
