const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "Ensimmäinen blogi",
    author: "Ensimmäinen kirjoittaja",
    url: "www.ensimmäinenblogi.com",
    likes: 1,
  },
  {
    title: "Toinen blogi",
    author: "Toisen kirjoittaja",
    url: "www.toinenblogi.com",
    likes: 2,
  },
  {
    title: "Kolmas blogi",
    author: "Kolmas kirjoittaja",
    url: "www.kolmasblogi.com",
    likes: 3,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async() => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};