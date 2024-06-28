const Joi = require('joi')

const blogSchema = Joi.object({
    Title: Joi.string().required(),
    Description: Joi.string().required(),
    Image: Joi.string().required()
})

function validateBlog(blog) {
    return blogSchema.validate(blog)
}

module.exports.validateBlog = validateBlog