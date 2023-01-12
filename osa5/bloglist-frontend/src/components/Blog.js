import { useState } from "react"

const Blog = ({blog, updateLike, deleteBlog, user}) => {
  
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginTop:10,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)


  const likeHandler = (event) => {
    event.preventDefault()
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    updateLike(blog.id, updatedBlog)
  }

  const removeBlog = (event) => {
    event.preventDefault()
    deleteBlog(blog.id)
  }

  const buttonDelete = () => {
    if (blog.user.name === user.name) {
      return (
        <button onClick={removeBlog}>delete</button>
      )
    }
  }

  // If not visible show little info
  if (!visible) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title}
          <button onClick={() => setVisible(true)}>show more</button>
        </div>
      </div>
    )
  }


  return(
  <div style={blogStyle}>
    <div>{blog.title} <button onClick={() => setVisible(false)}>hide</button></div>
      <div>
        likes: {blog.likes} <button onClick={likeHandler}>like</button>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        Author: {blog.author}
      </div>
      <div>
        {buttonDelete()}
      </div>
  </div>
  )   
}

export default Blog