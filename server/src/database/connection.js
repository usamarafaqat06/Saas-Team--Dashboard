const mongoose = require("mongoose");

const connection = () => {
  mongoose
    .connect(`mongodb://0.0.0.0:27017/SaaS`, {})
    .then(() => {
      console.log("connection successfull with mongo");
    })
    .catch((err) => {
      console.log(err, "...connection failed with mongo");
    });
};
module.exports = connection;
