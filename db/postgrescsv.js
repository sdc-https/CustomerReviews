const Pool = require('pg');
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');
const fastcsv = require('fast-csv');
const json2csv = require('json2csv').parse;

const avgReviewsPath = './db/averagereviews.csv';
const reviewsPath = './db/reviews.csv';

const writeObj = async(reviews, path) => {
  const writer = csvWriter({sendHeaders: false});
  fs.stat(path, function (err, stat) {
    writer.pipe(fs.createWriteStream(path));
    if (err === null) {
      console.log('File already exists, updating');
      reviews.map(async review => {
        let record = json2csv(review) + '\n';
       await fs.appendFile(path, record, function(err) {
         if (err) {
           console.log('Error appending CSV file', err);
         }
       });
    })
  } else {
    console.log('File not yet created, adding headers');
    writer.write({
      header1: 'ProductId',
      header2: 'Total Reviews',
      header3: 'Average Reviews'
    })
  }
  writer.end();
  })
}

let loadAvgReviews = async () => {
  console.log('LOADING AVG REVIEWS');
  let count = 1;
  let allReviews = [];
  for (let i = 1; i <= 10; i++) {
    let innerReviews = [];
    for (let j = 1; j <= 10; j++) {
    let averageReviews = faker.datatype.number({
      'min': 1,
      'max': 5,
      precision: .1
  })
    let newAvgReview = {
      productId: count,
      totalreviews: faker.datatype.number(3000),
      averagereviews: averageReviews
    }
    count++;

    await allReviews.push(newAvgReview);
  }
}
await writeObj(allReviews, avgReviewsPath);
console.log(count, 'Average Reviews Seeded');
}

loadAvgReviews();

