const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./database/connection');
const bodyParser = require('body-parser');
const Sequelize= require('sequelize');
const Op = Sequelize.Op;
const Job = require('./models/Job')

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`Rodando na porta: ${PORT}`);
});

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Handlebars configuration
const hbs = exphbs.create({ defaultLayout: 'main', extname: '.hbs' });
app.engine('.hbs', hbs.engine);

app.set('view engine', '.hbs'); 
app.set('views', path.join(__dirname, 'views'));

// Static files configuration
app.use(express.static(path.join(__dirname, 'public')));

// DB connection
db.authenticate()
  .then(() => {
    console.log('Conectou ao banco');
  })
  .catch(err => {
    console.log('Ocorreu um erro ' + err);
  });

// Routes
app.get('/', function (req, res) {

  let search = req.query.job;
  let query = '%'+search+'%';
  if(!search){
    Job.findAll({order:[
      ['createdAt', 'DESC']
    ]})
    .then(jobs => {
      res.render("index", {jobs});
    })
  } else {
    Job.findAll({
      where: {title: {[Op.like]: query}},
      order:[
      ['createdAt', 'DESC']
    ]})
    .then(jobs => {
      res.render("index", {jobs, search});
    });
  }
 

});

// jobs routes
app.use('/jobs', require('./routes/jobs'));