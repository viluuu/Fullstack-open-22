/* eslint-disable testing-library/no-node-access */
import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from "./Blog"
import Togglable from "./togglable";

test('renders content', () => {
    const blog = {
        title: 'Testi blogi',
        author: 'Testaaja',
        url: 'www.testi.fi',
        likes: 0,
        user: {
            username: "username",
            name: "nimi"
        }
    }
    render(<Blog blog={blog} />)

    const element = screen.getByText('Testi blogi')
    expect(element).toBeDefined()
})

test('clicking the show button, children are displayed', async () => {
    let container

    container = render(
        <Togglable buttonLabel="show...">
          <div className="testDiv" >
            togglable content
          </div>
        </Togglable>
      ).container

    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
})