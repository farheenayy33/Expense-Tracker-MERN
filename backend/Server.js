require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const  router = require('./Routes/authRoutes')
const transactionRouter = require("./Routes/transactionRoutes");
app.use(cors());                                                                       
app.use(express.json());
app.use('/api/auth',router)

app.use("/api/transaction", transactionRouter);

const port = process.env.PORT || 0;

app.get("/", (req, res) => {
  res.send("Hello World! ");
});

const  startServer=async()=>{
    await connectDB();
   const server = app.listen(port, () => {
     console.log(`Server listening on port ${server.address().port}`);
   });
}

startServer();

