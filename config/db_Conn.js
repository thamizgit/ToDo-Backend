const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://todo:todo@cluster0.zm018aw.mongodb.net/?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        }
      
      );
      console.log("MongoDb connected");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
