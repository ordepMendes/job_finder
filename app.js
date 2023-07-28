const express   = require('express');
const app       = express();
const db        = require('./database/connection');
const bodyParse = require('body-parser');
const router = express.Router();

const PORT = 3000;


app.listen(PORT, function(){
    console.log(`Rodando na porta: ${PORT}`);
});

//body parser
app.use(bodyParse.urlencoded({extended: false}));

// ? DB connection
db.authenticate()
.then(() => {
    console.log('conectou ao banco');
})
.catch(err => {
    console.log('Ocorreu um erro ' + err);
})


// ? routes
app.get('/', function(req,res){
    res.send('get funcionando');
});

// * jobs routes

app.use('/jobs', require('./routes/jobs'));