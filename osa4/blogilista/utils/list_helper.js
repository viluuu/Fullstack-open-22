const { json } = require("express")
const _ = require('lodash')
const { count } = require("../models/user")

const dummy = (blogs) => {
    return 1
}

const likesTotal = (blogs) => {
    const reducer = (sum, blogs) => {
        return sum + blogs.likes
    }

    return blogs.reduce(reducer, 0)
}

// Favoritevblog function 
const favoriteBlog = (blogs) => {
    let max_likes = 0
    let favorite = null;
    blogs.forEach(blog => {
        if (blog.likes > max_likes) {
            max_likes = blog.likes;
            favorite = blog;
        }
    })

    return favorite
}

// Most blogs, using lodash
const mostBlogs = (blogs) => {
    const authorBlogs = _.countBy(blogs, 'author')
    const authorWithMostBlogs = _.maxBy(Object.entries(authorBlogs), ([author, count]) => count)

    return {
        author: authorWithMostBlogs[0],
        blogs: authorWithMostBlogs[1]
    }
}

 
module.exports = {
    dummy, likesTotal, favoriteBlog, mostBlogs
}
