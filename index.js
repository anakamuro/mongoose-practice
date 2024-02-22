const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
  console.log('Connection OK!!!')
})
.catch(err=> {
    console.log('Connection error!!!');
    console.log(err);
})

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function(){
//     console.log('connection OK!!!!!')
// })

const movieSchema = new mongoose.Schema({
    title: String, 
    year: Number, 
    score: Number, 
    rating: String
})

const Movie = mongoose.model("Movie", movieSchema);
const amadeus = new Movie({title: "Amadeus", yera: 1986, score: 9.2, rating: 'R'});

Movie.insertMany([
  ({title: "Amelie", yera: 2001, score: 8.3, rating: 'R'}),
  ({title: "Alien", yera: 1979, score: 8.1, rating: 'R'}),
  ({title: "The Iron Gian", yera: 1999, score: 7.5, rating: 'PG'}),
  ({title: "Stand By Me", yera: 1986, score: 8.6, rating: 'R'}),
  ({title: "Monnrise Kingdom", yera: 2012, score: 7.3, rating: 'PG-13'}),
]).then(data => {
  console.log('success!!!');
  console.log(data);
})