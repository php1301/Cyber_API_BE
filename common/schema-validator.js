/* eslint-disable no-param-reassign */
function schemaValidator(joiSchema, data) {
  console.log(data);
  const result = joiSchema.validate(data, {
    abortEarly: false,
  });

  const errors = result.error
    ? result.error.details.map((err) => {
      if (
        err.type === 'string.pattern.base' &&
                  err.path.includes('password')
      ) {
        err.message = 'Password too weak.';
      }

      //   delete err.type;
      //   delete err.context;
      return err;
    })
    : [];

  if (errors.length > 0) {
    throw new Error(errors);
  }
}
// = {schemaValidator} || const abc.schemaValidator
module.exports.schemaValidator = schemaValidator;
