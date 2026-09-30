const Transaction = require("../models/Transactions");

const addIncome = async (req, res) => {
  try {
    const { userId, amount, category, description, date }= req.body;

    const income = new Transaction({
      userId: userId,
      type: 'income',
      amount: amount,
      category: category,
      description: description,
      date: date,
    });
    await income.save();
    res.status(201).json({
      message: "Transaction Successful!",
      income,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error ",
    });
  }
};
const addExpense=async (req,res)=>{
      try{
          const { userId, amount, category, description, date } = req.body;
          const expense = new Transaction({
            userId: userId,
            type: "expense",
            amount: amount,
            category: category,
            description: description,
            date: date,
          });
          await expense.save();
          res.status(201).json({
            message: "Expenses Added Successfully!",
            expense,
          });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error ",
    });
  }
}

const getTransactions = async(req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.query.userId,
    });
    console.log("User ID:", req.query.userId);
console.log("Transactions:", transactions);

    const incomeTransactions = transactions.filter(
      (transaction) => transaction.type === "income",
    );

    const totalIncome = incomeTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0,
    );

    const expenseTransactions = transactions.filter(
      (transaction) => transaction.type === "expense",
    );

    const totalExpense = expenseTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0,
    );

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      totalExpense,
      totalIncome,
      balance,
      transactions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error ",
    });
  }
};


module.exports = { addIncome, addExpense, getTransactions };
