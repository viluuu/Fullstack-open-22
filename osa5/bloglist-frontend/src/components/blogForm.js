import { useState } from "react";
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')

    const handleBlogAuthorChange = (event) => {
        setNewBlogAuthor(event.target.value)
    }
    
    const handleBlogTitleChange = (event) => {
        setNewBlogTitle(event.target.value)
    }
    
    const handleBlogUrlChange = (event) => {
        setNewBlogUrl(event.target.value)
    }

    const addBlog= (event) => {
        event.preventDefault()
        createBlog({
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogUrl,
            likes: 0
        })

        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
    }

    return(
        <div>
            <h2>Add a new blog</h2>

            <form onSubmit={addBlog}>
            <div>
              title 
              <input
                value={newBlogTitle}
                onChange={handleBlogTitleChange}
              />
            </div>
            <div>
              author 
              <input
                value={newBlogAuthor}
                onChange={handleBlogAuthorChange}
              />
            </div>
            <div>
              url 
              <input
                value={newBlogUrl}
                onChange={handleBlogUrlChange}
              />
            </div>
            <button type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm