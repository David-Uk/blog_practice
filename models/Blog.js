const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: { required: true, type: String },
    coverImage: { type: String },
    content: { required: true, type: String }
}, { timestamps: true })

module.exports = mongoose.model('Blog', blogSchema)