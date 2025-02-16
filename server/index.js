require ('newrelic')
const express = require('express')
const app = express()
const port = 3004
const path = require('path')
const db = require('../db/dbhelpers.js')
const cors = require('cors')
const bodyParser = require ('body-parser');
const jsonParser = bodyParser.json();
const morgan = require('morgan');


const reviewsip = `13.59.62.28`;


app.use(express.static(path.join(__dirname, "..", "public")))
app.use(cors());
app.use(morgan('tiny'));


app.listen(port, ()=>{
  console.log(`Server now listening at http://${reviewsip}:${port}`)
})

app.get('/reviews/:productid', function(req, res) {
  return db.getReviews(req.params.productid)
    .then((reviews) => {
      res.send(reviews);
    })
})

app.get('/averagereview/:productid', function(req, res) {
  return db.getAverageReviews(req.params.productid)
    .then((score) => {
      res.send(score[0]);
    })
})

app.get('/dp/:productid', function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/index.html'))
})

app.post('/reviews', function(req, res) {
  let data = req.body;
  db.postReviews(data);
  res.end();
})

app.put('/reviews/:productid', jsonParser, function (req, res) {
  let data = req.body;
  let productId = req.params.productid;
  db.putReviews(productId, data);
  res.end();
})

app.delete('/reviews/:productid', function (req, res) {
  let productId = req.params.productid;
  db.deleteReview(productId);
  res.end();
})
