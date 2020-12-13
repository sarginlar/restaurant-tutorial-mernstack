const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://restaurant-user:testing123@restaurant-tutorial-mer.g6p78.mongodb.net/<dbname>?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection success')
  } catch (err) {
    console.log(err);
  }
};

module.exports=connectDB