const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const blog = require('../models/blog')
const api = supertest(app)


beforeEach(async() => {
    await blog.deleteMany({})
    await blog.insertMany(helper.initialBlogs)
})



test('blogs are returned as json and lenght is 3', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('One blog added and lenght is 4. Blogs are returned as json', async () => {
    const newBlog = {
        title: 'Neljäs blogi',
        author: 'Neljäs kirjoittaja',
        url: 'www.neljäsblogi.com',
        likes: 0,
        user: {
            username: "username",
            name: "nimi"
        }
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        
})

test('One blog deleted', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
})

test('Blog likes updated', async() => {
    const blogs = await helper.blogsInDb()
    const blogToUpdate = blogs[0]
    const likesBeforeUpdate = blogToUpdate.likes

    const newLikes = {
        likes: likesBeforeUpdate + 2
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newLikes)
        .expect(200)

    
})



afterAll(() => {
  mongoose.connection.close()
})
