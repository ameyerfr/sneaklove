require("dotenv").config();
require ("./../config/mongodb.js");
const Sneaker = require("./../models/Sneaker");

const sneakers = [
  {
    name: 'Merrel',
    ref: '12SDFE3',
    sizes: [38,39,40,41,42],
    description: 'Great hiking shoes',
    image: 'https://cdn.pixabay.com/photo/2014/12/31/11/41/shoes-584850__480.jpg',
    price: 122,
    category: "men"
  }
];

Sneaker.insertMany(sneakers)
  .then(response => console.log("SEEDED DB !"))
  .catch(error => console.log("ERROR : ",error))
