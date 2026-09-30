const express= require('express')
const  router =express.Router()
const {
  addIncome,
  addExpense,
  getTransactions,
} = require("../Controller/transactionController");

router.post("/income", addIncome);
router.post("/expense", addExpense);
router.get("/transactions", getTransactions);
module.exports = router;