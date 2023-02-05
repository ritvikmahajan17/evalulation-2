const Joi = require("joi");

const postSchema = Joi.object({
    urlLink: Joi.string().uri().required()
});

const getBySectorSchema = Joi.object({
    sector: Joi.string().required()
});

const updateByIdSchema = Joi.object({
    id: Joi.string()
});

const postDetailsValidator = (req, res, next) => {
    const { error } = postSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ "message": error.message });
    }
    next();
};

const getBySectorValidator = (req, res, next) => {
    const { error } = getBySectorSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ "message": error.message });
    }
    next();
};

const updateByIdValidator = (req, res, next) => {
    const { error } = updateByIdSchema.validate(req.params);
    if (error) {
        return res.status(400).json({ "message": error.message });
    }
    next();
};

module.exports = {
    postDetailsValidator,
    getBySectorValidator,
    updateByIdValidator,
    postSchema,
    getBySectorSchema,
    updateByIdSchema
};