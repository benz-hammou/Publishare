const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://mohamedbenhammo:admin@mycluster.oz2pupu.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(
      "Database Mongoose is connected !: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
