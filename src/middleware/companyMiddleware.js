const Joi = require("joi");

const postSchema = Joi.object({
    urlLink: Joi.string().required()
});

const postDetailsValidator = (req, res, next) => {
    const { error } = postSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ "message": error.message });
    }
    next();
};

module.exports = {
    postDetailsValidator
};