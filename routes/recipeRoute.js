`--unhandled-rejections=strict`
const express = require('express');
const route = express.Router();
const controller = require('../controllers/recipeController');

route.get('/', async(req,res)=>{
    // lay gia tri tu textbox bang query
    let keyword = req.query.keyword;
    let recipes = [];
    if (keyword && keyword.trim() != ''){
        recipes = await controller.search(keyword);
    }
    else {
        recipes = await controller.getAll();
        recipes.forEach((item,index)=>{
            item.showIngredients = (index % 2 ); // bien index co gia tri bang true (1)
        });
    }
    // doc CSDL de lay du lieu ra
    //let recipes = await controller.search(keyword);
    res.locals.recipes = recipes;
    res.render('recipes');
});


route.get('/:id', async(req,res)=>{
    let id = req.params.id;
    let recipe = await controller.getById(id);
    res.locals.recipes = recipe;
    res.render('featured');
});

module.exports = route;