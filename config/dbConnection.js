const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then((self) => {
        console.log("Connected to ${self.connection.name}");
    })
    .catch((err) => {
        console.log(err);
    });