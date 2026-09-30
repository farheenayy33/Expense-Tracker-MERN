const mongoose = require("mongoose"); 

const connectDB =async ()=>{
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('mongo db connected successfully !!')
} catch (error) {
    console.log('backend error',error.message)
    process.exit()
}
}

module.exports= connectDB