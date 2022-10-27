const controller = {};
const models = require('../models');
const recipe = models.Recipe;
const sequelize = require('sequelize');
const Op = sequelize.Op;

controller.search = (keyword)=>{
    return recipe.findAll({
        where:{
            [Op.or]:{
                title: {
                    [Op.iLike]: `%${keyword}%`
                },
                description: {
                    [Op.iLike]: `%${keyword}%`
                }
            }
        }
    });
}

controller.getById = (id) => {
    return recipe.findOne({
        where: {id: id},
        include: [
            {
                model: models.Ingredient,
                as: 'Ingredients'
            },
            {
                model: models.Direction,
                as: 'Directions',
                order: ['order']
            }
        ]
    });
}

controller.getAll = ()=> {
    return recipe.findAll({
        include:[
            {
            model: models.Ingredient,
            as: 'Ingredients',
            limit: 3
            }
        ]
});
}
module.exports = controller;