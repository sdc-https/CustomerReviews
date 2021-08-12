const postgres = require('postgres');
const env = require('../.env');
const sql = postgres(`postgresql://localhost:5432/reviews`);
const faker = require('faker');


let count;

 let seedAvgReviews = async () => {
  console.log('ARE WE HERE');
  await sql`
  CREATE TABLE IF NOT EXISTS averagereview (
    productId INT,
    totalreviews Int,
    averagereviews int
  )
  `

   for (let i = 1; i <= 10000000; i++) {
     count = i;
    let averageReviews = faker.datatype.number({
      'min': 1,
      'max': 5,
      precision: .1
  })
    let totalReviews = faker.datatype.number(3000);
    await sql`
    INSERT INTO averagereview VALUES (
      ${i}, ${totalReviews}, ${averageReviews}
      )
      `
      .catch((error) => {
        console.log('ERROR ADDING TO AVERAGE REVIEWS DATABASE', error)
      })
    }

    console.log('SUCCESSFULLY ADDED ' + count + ' RECORDS TO AVERAGE REVIEW DATABASE');



}

let seedNewReviews = async (records) => {
  for (let i = 0; i <= records.length; i++) {
    await sql`
    INSERT INTO test VALUES (
      ${records[i].productId}, ${records[i].userName}, ${records[i].rating}, ${records[i].title}, ${records[i].location}, ${records[i].reviewDate}, ${records[i].reviewBody}, ${records[i].helpfulCount}, ${records[i].abuseReported}
      )
    `
    .catch((err) => {
      console.log('Error loading database', err);
    })
  }

}

let seedReviews = async () => {

  await sql`
  CREATE TABLE IF NOT EXISTS test (
    productId INT,
    USERNAME varchar(255),
    RATING INT,
    TITLE varchar(255),
    LOCATION varchar(255),
    REVIEWDATE DATE,
    REVIEWBODY TEXT,
    HELPFULCOUNT INT,
    ABUSEREPORTED BOOL
  );
  `
  .catch((error) => {
    console.log('ERROR SAVING TO REVIEWS DATABASE', error)
  })
  let productNum = 1;
  for (let j = 1; j <= 10; j++) {
    let records = [];
    for (let k = 1; k <= 10; k++) {
      let numberOfReviews = Math.floor(Math.random() * 5 + 1)
      for (let i = 0; i <= numberOfReviews; i++) {
        let newReview = {
           productId : productNum,
           userName : faker.internet.userName(),
           rating : faker.datatype.number(5),
           title : faker.lorem.words(),
           location : faker.address.country(),
           reviewDate : faker.date.past(),
           reviewBody : faker.lorem.paragraph(),
           helpfulCount : faker.datatype.number(2000),
           abuseReported : faker.datatype.boolean()
        }
        records.push(newReview);
    }
    productNum++;
    console.log(productNum);
  }
    await seedNewReviews(records);
  }
}


require('make-runnable');

