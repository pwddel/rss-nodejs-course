const Joi = require('joi');
// eslint-disable-next-line no-unused-vars
const validate = (schema, property) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema);
    // eslint-disable-next-line no-eq-null,eqeqeq
    const valid = error == null;

    if (valid) {
      // eslint-disable-next-line callback-return
      next();
    } else {
      console.log(error.toString());
      const { details } = error;
      const message = details.map(i => i.message).join(',');

      console.log('error', message);
      res.status(422).json({ error: message });
    }
  };
};

const schemas = {
  user: Joi.object()
    .keys({
      name: Joi.string().required(),
      login: Joi.string().required(),
      password: Joi.string().required()
    })
    .options({ abortEarly: false, allowUnknown: true }),
  board: Joi.object().keys({
    title: Joi.string().required(),
    columns: Joi.array()
      .items(
        Joi.object().keys({
          title: Joi.string().required(),
          order: Joi.number().required()
        })
      )
      .required()
  }),
  id: {
    id: Joi.string().guid()
  }
};

module.exports = {
  validate,
  schemas
};
