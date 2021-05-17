const express = require('express')
const app = express()
const port = 9001
const path = require('path')
const db = require('../db/dbhelpers')

app.use(express.static(path.join(__dirname, "..", "public")))

app.listen(port, ()=>{
  console.log(`Server now listening at http://localhost:${port}`)
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
      res.send(score);
    })
})

app.get('/:productId', function(req, res) {
  //res.send(req.params.productId);
  res.sendFile(path.join(__dirname, '/../public/Index.html'))
})