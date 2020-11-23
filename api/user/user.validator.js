const Joi = require('joi');
const { schemaValidator } = require('../../common/schema-validator');
const { rolesEnum } = require('./user.enum');
// JOI la Yup phien ban frontend cho easy validators
const rolesSchema = Joi.object({
  role: Joi.valid(...rolesEnum).required(),
}).unknown(true);

const userUpdateSchema = Joi.object({
  hoTen: Joi.string().min(6).max(255),
  soDT: Joi.string().min(10).max(11),
}).unknown(true);
module.exports = {
  validateUserUpdate: function (req, res, next) {
    try {
      schemaValidator(userUpdateSchema, req.body);
    } catch (e) {
      next(e);
    }
  },
  validateRoleUpdate: function (req, res, next) {
    try {
      schemaValidator(rolesSchema, req.body);
      next();
    } catch (e) {
      next(e);
    }
  },
};
