require("dotenv").config();

const mongoose = require("mongoose");
const Spot = require("../models/Spot");
const Article = require("../models/Blog");

const spots = [
  {
    name: "Label",
    ref: "1",
    address: "Bezaudun",
    latitude: 44.65345,
    longitude: 5.171185,
    image:
      "https://www.sentier-nature.com/montagne/public/post/sentiers-ailleurs/cheiron/gyps-fulvus-cheiron-colle-menon.jpg",
    description:
      "Le Mouton d'Anou, sommet suffisamment isolé, offre un large panorama sur la Côte d'Azur, le Mercantour et le Massif du Cheiron. L'itinéraire quitte le Broc, village perché, pour une longue randonnée qui visitera aussi la Colle de Menon, à ne pas délaisser pour son caractère sauvage, en particulier. Un bon sentier s'élève rapidement au-dessus du village pour traverser le Bois de Lausabéu et le Bois du Chier. Un aller et retour au Mouton d'Anou empruntera l'une ou l'autre des nombreuses sentes jalonnées de cairns, avant de poursuivre la randonnée vers l'Ouest. La randonnée devient plus aventureuse pour atteindre la Colle de Menon et de là, trouver le Vallon de Chanteperdrix. Le retour par les Combes, emprunte une petite route puis une piste DFCI jusqu'à la cheminée d'équilibre du Canal de la Gravière au Moulinet. Encore quelques mètres pour dévaler le sentier du village et retrouver le point de départ.",
    comments: [],
    category: ""
  },
  {
    name: "La Graville",
    ref: "25",
    address: "Saou",
    latitude: 44.648761,
    longitude: 5.078759,
    image:
      "http://densite-escalade.fr/wp-content/uploads/2014/11/DSCF3853-300x168.jpg",
    description:
      "Petit parking à droite en allant vers la forêt de Saou. Au milieu des pins une petite colline surmontée d'une falaise calcaire. Sur cette falaise entre 50 et 100 voies du 3a au 7b. Courte marche d'approche bien raide. Orientation nord très appréciable en été !",
    comments: [],
    category: "3a, 7b"
  },
  {
    name: "Le mur des étoiles",
    ref: "26",
    address: "Saou",
    latitude: 44.652589,
    longitude: 5.066158,
    image:
      "https://media.camptocamp.org/c2corg_active/1258294014_1346757260MI.jpg",
    description:
      "Accessible depuis le village de Saoû, le Mur des Etoiles c’est une douzaine de voies entre 6a et 7c+. Le secteur situé à proximité du secteur Roche Colombe est accessible en 15 à 20 minutes de marche à travers vergers, buis et forêt depuis le parking de l’église de Saoû. Ça monte pas mal ! Pour vous guider, suivez les petits panneaux gentillement placés par le club d’escalade local : le CAF Saoû Synclinal. La vue du secteur est magnifique.",
    comments: [],
    category: "6a, 8a"
  },
  {
    name: "Le mur du son",
    ref: "30",
    address: "Pont-de-barret",
    latitude: 44.607003,
    longitude: 5.012892,
    image: "https://oblyk.org/storage/photos/crags/1300/mur-du-son-881.jpg",
    description:
      "Marche d'approche qui calme bien avec 30 minutes de raide montée. Mieux vaut prendre son temps et ne pas trop s'enflammer pour arriver en état de grimper sur le secteur. On y trouve un joli et original caillou très adhérent. Les voies sont bien équipées, on ne se fait pas trop peur et on peut se concentrer sur les difficultés. J'ai beaucoup aimé et ça m'a motivé pour aller acheter le topo en redescendant au village.",
    comments: [],
    category: "3a,7b"
  },
  {
    ref: "31",
    name: "La borne de Jeanne",
    address: "Soyans",
    latitude: 44.625489,
    longitude: 5.017309,
    image:
      "https://oblyk.org/storage/photos/crags/200/la-borne-de-jeanne-5.jpg",
    description:
      "La borne de Jeanne est un site d'escalade de Voie de Calcaire, situé à Soyans dans le département Drôme, On y trouve 2 lignes allant de 6b à 7b",
    comments: [],
    category: "6b, 7b"
  },
  {
    ref: "32",
    name: "Le petit cirque",
    address: "Soyans",
    latitude: 44.627081,
    longitude: 5.029965,
    image: "https://oblyk.org/storage/photos/crags/1300/le-petit-cirque-7.jpg",
    description:
      "9 voies dans une minuscule baume au-dessus de la route Saoû -> Pont de Barret, 400 mètres après le Pont de Félines sur la droite. Nom des voies peints en rouge. Voies courtes et pêchues sur profil déversant.",
    comments: [],
    category: "5c, 7c"
  },
  {
    ref: "33",
    name: "Rocher des Abeilles",
    address: "Soyans",
    latitude: 44.627618,
    longitude: 5.02232,
    image:
      "https://media.camptocamp.org/c2corg_active/1559462967_1302800704MI.jpg",
    description:
      "Petit rocher école à 10 km d'Apt et a coté d'un petit cours d'eau 'le calavon' qui, en été, rafraichira les petits... et les grands.",
    comments: [],
    category: "4c, 7a"
  },
  {
    ref: "34",
    name: "Mount Tsukuba",
    address: "Tokyo",
    latitude: 36.552,
    longitude: 140.098,
    image:
      "https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2013/09/IMG_2391.jpg",
    description:
      "Mount Tsukuba is a gorgeous double peaked mountain in the Ibaraki Prefecture. At only 877 meters tall, Tsukuba-san is a much easier, relaxing, and less crowded alternative to the ever popular Mt. Fuji. On a clear day, you can see a panoramic view of the entire Kanto plain, the skyline of Tokyo, and Mt. Fuji. On a cloudy day, you can still get a pretty killer view of the surrounding nature.",
    comments: [],
    category: ""
  },
  {
    ref: 37,
    name: "Dao Cheng",
    address: "sichuan",
    latitude: 29.3231,
    longitude: 100.053,
    image:
      "https://lh3.googleusercontent.com/proxy/i-LmEi8N6wYlro0BA7067g7ZDmPQDOzTyiHrb2WPWoLHR-b53JbR5LEYzlDC_A6PDRSOMNuwXxeyZIMzKAWkI_S5M9sAkXvN",
    description:
      "Hidden 6 hours south of Beijing is a spectacular gorge system known as the Guoliang National Park. The gorge is part of the Taihang Mountains in central China. It is a world away from the heavy industry that sprawls from overpopulated Chinese cities east of the range. In 2009, the area was put on the radar by one of China’s first rock climbing festivals. The gorge system, unfortunately, fell off the radar after the festival. The spotlight turned to other climbing destinations, but the massive gorge system at Guoliang could not be ignored for too long.",
    comments: [],
    category: "VB, V9"
  },
  {
    ref: "39",
    name: "Hampi",
    address: "Karnataka",
    latitude: 15.317277,
    longitude: 75.71389,
    image: "https://i.redd.it/ze8afrx622p01.jpg",
    description:
      "Hampi is located in northern Karnataka is a World Heritage and is home to the most beautiful and evocative ruins in Karnataka. The town and bouldering is located within the ruins of the Vijayanagar kingdom and as such has a number of popular ruins which draw in travellers from around the world. In terms of climbing; granite boulders as far as the eyes can see.",
    comments: [],
    category: ""
  },
  {
    ref: "40",
    name: "The Finnish Line",
    address: "Coop",
    latitude: -32.14524,
    longitude: 19.033785,
    image:
      "https://d1vs4ggwgd7mlq.cloudfront.net/wp-content/uploads/2018/07/woods-finnish-line-photo-brooke-raboutou.jpg",
    description:
      "It's very rare in the world to find something that's the most striking line in the area, and it's actually one of the hardest too.",
    comments: [],
    category: "5c, 8a"
  },
  {
    ref: "42",
    name: "Praia da Fortaleza",
    address: "Lagoinha",
    latitude: -23.0903,
    longitude: 45.1903,
    image:
      "https://photo980x880.mnstatic.com/53e1c76f079a6e5309eafbcf37df4551/ubatuba-praia-da-fortaleza.jpg",
    description:
      "Curta sobre a pratica de boulder, uma modalidade da escalada em Ubatuba na praia de Fortaleza. Com escaladores como Janine Cardoso, Flavio Massa, Lucas Rocha...",
    comments: [],
    category: "6b, 7b"
  },
  {
    ref: "66",
    name: "Rhode Island",
    address: "Aquidneck",
    latitude: 41.823989,
    longitude: -71.412834,
    image: "http://www.climbri.org/BearRock/image013.jpg",
    description:
      "The cliff is 70 feet at its highest. It faces east and is slow to dry after rain. It is gneiss-quartz conglomerate (sharp) rock. The bolted routes are on one face and consist of mostly juggy overhanging routes. All of the routes are well bolted and have bolted top anchors. It is actually easier to lead these routes than top-rope them due to the overhangs and location of anchors.",
    comments: [],
    category: "VB, V16"
  },
  {
    ref: "771",
    name: "Owey Island",
    address: "Donegal",
    latitude: 55.05,
    longitude: -8.45,
    image:
      "https://uniqueascent.ie/uploadedfiles/articles/donegal-rock-climbing-2019/WAW-Wall-Owey.jpeg",
    description:
      "An Sho, another outstanding year on the coast, out on the uninhabited islands and in the hills of Donegal with Cruit and Owey Islands having a steady stream of climbing visitors from March to November. ",
    comments: [],
    category: "2b, 6c"
  },
  {
    name: "La Colonne du Tigre",
    ref: "1939",
    address: "Fontainebleau",
    latitude: 48.404676,
    longitude: 2.70162,
    image:
      "https://image.thecrag.com/0x199:639x412/fit-in/639x213/5a/80/5a80978cef307e6ddb9101d9b2ab578ace4ad453",
    description:
      "Fontainebleau is the most popular bouldering destination in the world and a must visit place for every climber. Situated about 70 km South-East from Paris the climbing area consists of multiple different sectors located around the Fontainebleau village.",
    comments: [],
    category: "2b, 8c"
  }
];



const articles = [{
    date: "Mai 1rst, 2020",
    title: "South of France, in the Drôme",
    text: "One of the main attraction is the mountain forests in the Drôme province. A mecca for most European boulder climbers, with 30 areas, each having with 50 to 100 routes . It is an incredible paradise for those wanting to explore climbing technics and train for bigger climbs, on a fine grit stone. In this forest a popular hike is the Circuit des 25 bosses (25 hills) providing an overall 1000m ascent. It takes a day to do it.",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=993&q=80"
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
