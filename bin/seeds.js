require("dotenv").config();

const mongoose = require("mongoose");
const Spot = require("../models/Spot");

const spots = [
  {
    name: "Rogers Mountain",
    ref: "1",
    address: "KFC nears house",
    latitude: 12,
    longitude: 85,
    image: "",
    description: "hard climb",
    comments: [],
    category: "",
  },
  {
    name: "Dean Mountain",
    ref: "2",
    address: "coffe shop nears house",
    latitude: 42,
    longitude: 75,
    image: "",
    description: "hard climb",
    comments: [],
    category: "",
  },
  {
    name: "Benfadhel Mountain",
    ref: "3",
    address: "Not here",
    latitude: 18,
    longitude: 69,
    image: "",
    description: "hard climb",
    comments: [],
    category: "",
  },
];

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log("Connected to ${self.connection.name}");
    Spot.create(spots)
      .then((createdSpots) => console.log(createdSpots))
      .catch((err) => console.log(err));
  })
  .catch((err) => {
    console.log(err);
  });
