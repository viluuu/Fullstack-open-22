const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require('../models/user')

const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {name: 1, id: 1})
  
  response.json(blogs)
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put("/:id", async(request, response) => {
  const blog = request.body
  const id = request.params.id

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog)

  response.json(blog)
})


blogsRouter.post("/", async (request, response, next) => {
  const body = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'})
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

});

blogsRouter.delete("/:id", async(request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end();
})


module.exports = blogsRouter;
