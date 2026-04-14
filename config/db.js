const mongoose=require('mongoose');
const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI)
    console.log("database is conneted....")
};
module.exports=connectDB;

