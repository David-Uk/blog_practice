const Blog = require("../models/Blog");

// const User = require("../models/User");

exports.homePage = async (req, res) => {
    const blogs = await Blog.find()
    res.render('index', { blogs: blogs })
}

exports.createBlog = async (req, res) => {
    console.log(req.body)
    const { title, content } = req.body;
    const coverImage = req.file.path;
    console.log(coverImage)
    const newBlog = await new Blog({ title, content, coverImage })
    newBlog.save()
    return res.redirect('/blog');
}

exports.getBlogs = async (req, res) => {
    const allBlogs = await Blog.find()
    // console.log(allBlogs)
    res.render('blog', { allBlogs: allBlogs })
}

exports.getCreateBlog = async (req, res) => {
    res.render('createBlog')
}

exports.editPage = async (req, res) => {
    const { id } = req.params;
    const post = await Blog.findById({ _id: id })
    res.render('edit', { post: post })
}

exports.editBlog = async (req, res) => {
    const { id } = req.params;
    if (req.body._method === 'PATCH') {
        console.log(id)
        const post = await Blog.findByIdAndUpdate({ _id: id }, { title: req.body.title, content: req.body.content })
        if (post) res.redirect('/blog')
        else res.redirect('/error')
    }
}

exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
    if (req.body._method === 'DELETE') {
        const post = await Blog.findByIdAndDelete(id)
        res.redirect('/blog')
    }
}
