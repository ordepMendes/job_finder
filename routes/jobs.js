const express = require('express');
const router  = express.Router();
const Job     = require('../models/Job');

router.get('/test', (req, res) => {
    res.send('deu certo maluco');
});


// * add job via post

router.post('/add', (req, res) => {
    let {title, description, salary, type, email, new_job, company} = req.body;
    Job.create({title, description, salary, type, email, new_job, company})
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
})

module.exports = router;