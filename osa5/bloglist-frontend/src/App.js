import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'
import BlogForm from './components/blogForm'
import Togglable from './components/togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  // Blogin lisäys
  const addBlog = (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
        })
      setErrorMessage(`new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    } catch (error) {
      setErrorMessage("Error happened")
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  const deleteBlog = async (blogObject) => {
    if (window.confirm("Do you want to delete this blog?")) {
      await blogService.remove(blogObject)
      setBlogs(blogs.filter(d => d.id !== blogObject))
    }
  }

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <Notification message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username 
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password 
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>      
    </div>
  )


  const updateLike = async (id, blogToUpdate) => {
    const updatedBlog = await blogService.update(id, blogToUpdate)
      setBlogs(
        blogs.map((blog) => 
          blog.id === updatedBlog.id
            ? {...blog, likes: updatedBlog.likes}
            : blog
        )
      )
  }

  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          <h1>blogs</h1>

          <Notification message={errorMessage}/>

          <p>{user.name} logged in. <button onClick={handleLogout}>logout</button> </p>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>

          {blogs.map(blog =>
            <Blog 
              key={blog.id}
              blog={blog}
              updateLike={updateLike}
              deleteBlog={deleteBlog}
              user={user}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App
