const mongoose = require('mongoose');
const db = require('./dbhelpers.js');
const faker = require('faker');

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

const averageReviewsSchema = new mongoose.Schema({
  productId: String,
  totalReviews: Number,
  averageReviews: Number
})

const averageReviews = mongoose.model('AverageReviews', averageReviewsSchema);
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
      reviewBody: faker.lorem.paragraph(),
      helpfulCount: faker.datatype.number(2000),
      abuseReported: faker.datatype.boolean()
    })
    newReview.save(function(err, success) {
      if (err) {
        console.log('error saving to the database')
      }
    })
  }

  for (let i =1; i <= 100; i++) {
    let newAverageReview = new averageReviews({
      productId: i,
      totalReviews: faker.datatype.number(3000),
      averageReviews: faker.datatype.number({
        'min': 1,
        'max': 5,
        precision: .1
    }),
    })
    newAverageReview.save(function(err, success){
      if (err) {
        console.log('error saving to the database')
      }
    })

  }
}

let getReviews = (product) => {
  console.log('get reviews is running');
  console.log(product);
  return Review.find({productId : product})
}

let getAverageReviews = (product) => {
  return averageReviews.findOne({productId : product})
}



seed();


module.exports.getReviews = getReviews;
module.exports.getAverageReviews = getAverageReviews;
module.exports.seed = seed;
