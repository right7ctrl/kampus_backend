const Joi = require('joi');

const schema = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    name: Joi.string().required(),
    school: Joi.string().required(),
    username: Joi.string().required(),



    mail: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
});


module.exports = schema;