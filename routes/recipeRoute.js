const express = require('express');
const route = express.Router();

route.get('/', (req,res)=>{
    res.render('recipes');
});

route.get('/:id', (req,res)=>{
    res.render('featured');
});

module.exports = route;