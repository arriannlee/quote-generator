console.log('May Arriann be with you')

const express = require('express')
const bodyParser = require('body-parser') //middleware
const app = express()
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb+srv://arriannlee:ECjI8kxhIFp0TE6r@cluster0.xojdn9z.mongodb.net/?retryWrites=true&w=majority',
  { useUnifiedTopology: true })
  .then(client => {
    console.log('This is fucking awesome')
    app.set('view engine', 'ejs')

    const db = client.db('quote-generator')
    const quotesCollection = db.collection('quotes')
    
    // app.set('view engine', 'ejs')

    app.use(bodyParser.urlencoded({ extended:  true }))
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html')
      const cursor = db.collection('quotes').find()
      db.collection('quotes')
      .find()
      .toArray()
      .then(results => {
        console.log(results)
        res.render('index.ejs', {quotes : results})
      })
      .catch(error => console.error(error))
      // res.render('index.ejs', {})
    })
    app.post('/quotes', (req, res) => {
      quotesCollection
      .insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })
    app.listen(8000, function () {
      console.log('listening on 8000')
    })
  })
  .catch(error => console.error(error))

// app.listen(3000, function () {
//   console.log('listening on 3000')
// })

// app.use(bodyParser.urlencoded({ extended:  true }))

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })

// app.post('/quotes', (req, res) => {
//   console.log(req.res)
// })