const Joi = require('@hapi/joi');

const product = Joi.object({
    limit: Joi.number().min(0).required(),
    page: Joi.number().min(0).required(),
});


module.exports = product;