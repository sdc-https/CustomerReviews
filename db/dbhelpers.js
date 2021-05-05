const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/CustomerReviews', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open' , function() {
  console.log('we are connected?! WHY CNAT I CONNECT!!')
});

const ReviewsSchema = new mongoose.Schema({
  product: String,
  userName: String,
  rating: Number,
  title: String,
  location: String,
  reviewDate: Date,
  reviewBody: String,
  helpfulCount: Number,
  abuseReported: Boolean
})
