const validateUserRgister = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req.body);
      if (result.success === true) {
       
        next()
      } else {
        res.status(400).send(result.error);
      }
    } catch (error) {
      res.status(500).send( error);
    }
  };
};

module.exports = validateUserRgister 

