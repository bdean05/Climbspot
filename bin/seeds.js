require("dotenv").config();

const mongoose = require("mongoose");
const Spot = require("../models/Spot");

const spots = [
  {
    name: "Label",
    ref: "1",
    adress: "Bezaudun",
    latitude: 5.171185,
    longitude: 44.65345,
    image: "",
    description: "",
    comments: [],
    category: ""
  },
  {
    name: "La Graville",
    ref: "25",
    adress: "Saou",
    latitude: 44.648761,
    longitude: 5.078759,
    image: "",
    description: "",
    comments: [],
    category: ""
  },
  {
    name: "Le mur des étoiles",
    ref: "26",
    adress: "Saou",
    latitude: 44.652589,
    longitude: 5.066158,
    image: "",
    description: "",
    comments: [],
    category: ""
  },
  {
    name: "Le mur des étoiles",
    ref: "30",
    adress: "Pont-de-barret",
    latitude: 44.607003,
    longitude: 5.012892,
    image: "",
    description: "",
    comments: [],
    category: ""
  },
  {
    ref: "31",
    name: "La borne de Jeanne",
    adress: "Soyans",
    latitude: 44.625489,
    longitude: 5.017309,
    image: "",
    description: "",
    comments: [],
    category: ""
  },
  {
    ref: "32",
    name: "Le petit cirque",
    adress: "Soyans",
    latitude: 44.627081,
    longitude: 5.029965,
    image: "",
    description: "",
    comments: [],
    category: ""
  },
  {
    ref: "33",
    name: "Rocher des Abeilles",
    adress: "Soyans",
    latitude: 44.627618,
    longi: 5.02232,
    image: "",
    description: "",
    comments: [],
    category: ""
  },
  {
    ref: "34",
    name: "Mur du son",
    adress: "Saou",
    latitude: 44.65507,
    longitude: 5.058345,
    image: "",
    description: "",
    comments: [],
    category: ""
  },
  {
    ref: 37,
    name: "Le grand regardé",
    adress: "Saou",
    latitude: 44.651711,
    longitude: 5.07207,
    image: "",
    description: "",
    comments: [],
    category: ""
  },
  {
    ref: "39",
    name: "Roche colombe",
    adress: "Saou",
    latitude: 44.656026,
    longitude: 5.047226,
    image: "",
    description: "",
    comments: [],
    category: ""
  },
  {
    ref: "40",
    name: "La Poupoune",
    adress: "Saou",
    latitude: 44.656053,
    longitude: 5.050053,
    image: "",
    description: "",
    comments: [],
    category: ""
  },
  {
    ref: "42",
    name: "L'aiguille de la tour",
    adress: "Saou",
    latitude: 44.650803,
    longitude: 5.07275,
    image: "",
    description: "",
    comments: [],
    category: ""
  },
  {
    ref: "66",
    name: "Pas de Lauzun",
    adress: "Saou",
    latitude: 44.66473,
    longitude: 5.0691,
    image: "",
    description: "",
    comments: [],
    category: ""
  },
  {
    ref: "771",
    name: "Les 3 becs",
    adress: "Saou",
    latitude: 44.64229,
    longitude: 5.20192,
    image: "",
    description: "hard climb",
    comments: [],
    category: ""
  },
  {
    name: "La Ceyte",
    ref: "1939",
    adress: "Saou",
    latitude: 44.65345,
    longitude: 5.078,
    image: "",
    description: "hard climb",
    comments: [],
    category: ""
  }
];

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log("Connected to ${self.connection.name}");
    Spot.create(spots)
      .then(createdSpots => console.log(createdSpots))
      .catch(err => console.log(err));
  })
  .catch(err => {
    console.log(err);
  });
