const mongoose = require('mongoose');
const faker = require('faker');

mongoose.connect('mongodb://localhost/CustomerReviews', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open' , function() {
  console.log('we are connected?!')
});

const reviewsSchema = new mongoose.Schema({
  productId: String,
  userName: String,
  rating: Number,
  title: String,
  location: String,
  reviewDate: Date,
  reviewBody: String,
  helpfulCount: Number,
  abuseReported: Boolean
})

const Review = mongoose.model('Review', reviewsSchema);

let seed = () => {
  for (let i = 0; i <= 3000; i++) {
    let newReview = new Review({
      productId: faker.datatype.number(100),
      userName: faker.internet.userName(),
      rating: faker.datatype.number(5),
      title: faker.lorem.words(),
      location: faker.address.country(),
      reviewDate: faker.date.past(),
      reviewBody: faker.lorem.sentences(),
      helpfulCount: faker.datatype.number(2000),
      abuseReported: faker.random.boolean()
    })
    newReview.save(function(err, success) {
      if (err) {
        console.log('error saving to the database')
      }
    })
  }
}

seed();


