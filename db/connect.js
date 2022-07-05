const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = () => {
  mongoose
  .connect(process.env.DB_URI || 3000 , { useNewUrlParser: true })
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err)=>{
    console.log(err);
  });
}


module.exports = connectDB