const dummy = (blogs) => {
    return 1
}

const likesTotal = (blogs) => {
    const reducer = (sum, blogs) => {
        return sum + blogs.likes
    }

    return blogs.reduce(reducer, 0)
}

 
module.exports = {
    dummy, likesTotal
}
