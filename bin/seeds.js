require("dotenv").config();
require ("./../config/mongodb.js");
const Sneaker = require("./../models/Sneaker");
const Tag = require("./../models/Tag");

const sneakers = [
  {
    name: 'Merrel',
    ref: '12SDFE',
    sizes: [38,39,40,41,42],
    description: 'Great hiking shoes',
    image: 'https://cdn.pixabay.com/photo/2014/12/31/11/41/shoes-584850__480.jpg',
    price: 120,
    category: "men"
  },
  {
    name: 'AirMax',
    ref: '354KJ4',
    sizes: [38,39,40,41,42,43,46,52],
    description: 'The greatest sneakers of all time',
    image: 'https://www.dhresource.com/600x600/f2/albu/g9/M00/5A/A3/rBVaVV0YzE2ABXHQAAIEq2Mja8k398.jpg',
    price: 150,
    category: "women"
  },
  {
    name: 'Scholl',
    ref: 'SLDFKJ3453',
    sizes: [4,12,13],
    description: "Brice de Nice's favorite shoes. Not sneakers",
    image: 'http://t0.gstatic.com/images?q=tbn%3AANd9GcRxbcEYcJ64Oe2swW2zk2_ACwC4nzcdB1CYbiz_B-BlVIqywRpHSztMjr3rqOmkdhMJwyY8Z0U&usqp=CAc',
    price: 15,
    category: "kids"
  },
  {
    name: 'Bozo',
    ref: 'LOLILOL',
    sizes: [80],
    description: 'On rigole bien',
    image: 'http://t0.gstatic.com/images?q=tbn%3AANd9GcQBeJY-9tV5V8lN0I_XdmRf0McVQPYmLMCNRDAteadOCZWw2tylBCCejDGHFNC5kyUjEAW9cP7U&usqp=CAc',
    price: 69,
    category: "men"
  }
];

Sneaker.insertMany(sneakers)
  .then(response => console.log("SEEDED DB WITH SNEAKERS !"))
  .catch(error => console.log("ERROR : ",error))


const tags = [
  {label : "hiking"},
  {label : "running"},
  {label : "urban"},
  {label : "ugly"},
  {label : "clown"},
  {label : "trashy"},
  {label : "skateboarding"},
  {label : "orthopedic"}
];

Tag.insertMany(tags)
  .then(response => console.log("SEEDED DB WITH TAGS !"))
  .catch(error => console.log("ERROR : ",error))
