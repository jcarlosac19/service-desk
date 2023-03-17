const mongoose = require("mongoose");
const config = require('../config/index').config;
const dotenv = require('dotenv');
dotenv.config();
const MONGO_URI  = "mongodb://127.0.0.1:27017/DAV";
const ATLAS_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@clustervanguardia.5drt9oa.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`

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