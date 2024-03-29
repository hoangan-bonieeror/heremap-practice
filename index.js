const express = require('express')
const app = express()
require('dotenv').config()
const port = 3000;

app.set('view engine', 'pug')


const route = require('./api/routes/routing.route')
const geocodeRoute = require('./api/routes/geocode.route')

app.use('/api/route', route)
app.use('/api/geocode', geocodeRoute)

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
  })

app.get('/', function (req, res) {
  res.render('myHome')
})

app.get('/routing',function(req,res){
  res.render('routing')
})

app.get('/isoline',(req,res)=> {
  res.render('isoline')
})





