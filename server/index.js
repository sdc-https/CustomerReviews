const express = require('express')
const app = express()
const port = 3004
const path = require('path')
const db = require('../db/seed.js')
const cors = require('cors')

app.use(express.static(path.join(__dirname, "..", "public")))
app.use(cors());


app.listen(port, ()=>{
  console.log(`Server now listening at http://52.55.99.35:${port}`)
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

app.get('/dp/:productid', function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/index.html'))
})