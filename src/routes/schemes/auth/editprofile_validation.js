const Joi = require('joi');


const schema = Joi.object({

    id: Joi.string().required(),
    username: Joi.string().required(),
    school: Joi.string().required(),
});


module.exports = schema;