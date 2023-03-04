const mongoose = require("mongoose");
const MONGO_URI  = "mongodb://127.0.0.1:27017/DAV";
const ATLAS_URI = "mongodb+srv://kenyy03:passKenypass@clustervanguardia.5drt9oa.mongodb.net/DAV?retryWrites=true&w=majority"

mongoose.set("strictQuery", false);

exports.connect = () => {
  mongoose
    .connect(ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};