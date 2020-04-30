require("dotenv").config();

const mongoose = require("mongoose");
const Spot = require("../models/Spot");
const Article = require("../models/Blog");

const spots = [{
    name: "Label",
    ref: "1",
    address: "Bezaudun",
    latitude: 44.65345,
    longitude: 5.171185,
    image: "",
    description: "",
    comments: [],
    category: ""
  },
  {
    name: "La Graville",
    ref: "25",
    address: "Saou",
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
    address: "Saou",
    latitude: 44.652589,
    longitude: 5.066158,
    image: "",
    description: "",
    comments: [],
    category: ""
  },
  {
    name: "Le mur du son",
    ref: "30",
    address: "Pont-de-barret",
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
    address: "Soyans",
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
    address: "Soyans",
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
    address: "Soyans",
    latitude: 44.627618,
    longitude: 5.02232,
    image: "",
    description: "",
    comments: [],
    category: ""
  },
  {
    ref: "34",
    name: "Mur du son",
    address: "Saou",
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
    address: "Saou",
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
    address: "Saou",
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
    address: "Saou",
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
    address: "Saou",
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
    address: "Saou",
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
    address: "Saou",
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
    address: "Saou",
    latitude: 44.65345,
    longitude: 5.078,
    image: "",
    description: "hard climb",
    comments: [],
    category: ""
  }
];



const articles = [{
    title: "toto",
    text: "tataa",
    image: "public/images/olivier.jpg"
  }
];



mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to ${self.connection.name}`);
    Article.create(articles)
      .then(createdarticles => console.log(createdarticles))
      .catch(err => console.log(err));
  })
  .catch(err => {
    console.log(err);
  });



mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to ${self.connection.name}`);
    Spot.create(spots)
      .then(createdSpots => console.log(createdSpots))
      .catch(err => console.log(err));
  })
  .catch(err => {
    console.log(err);
  });