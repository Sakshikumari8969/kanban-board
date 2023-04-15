const mongoose = require("mongoose");

function connectDatabase() {
  mongoose
    .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then(() => console.log("mongoDb is connected"))
    .catch((err) => console.log(err.message));
}

module.exports.connectDatabase = connectDatabase;
