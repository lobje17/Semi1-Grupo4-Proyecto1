import React from 'react'
import { Link } from 'react-router-dom'
import ThemeContext from '../../Context/ThemeContext'
import './Navbar.css'

function Navbar() {

    return (
        <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, toggleTheme} = value
      return (
        <>
          {!isDarkTheme ? (
            <div className="nav-bar-container-light">
              <img
                src="https://assets.ccbp.in/frontend/react-js/website-logo-light-theme-img.png"
                className="website-logo"
                alt="website logo"
              />
              <ul className="middle-items">
                <li className="list-item">
                  <Link to="/" className="link-light">
                    Home
                  </Link>
                </li>
              </ul>
              <button
                type="button"
                className="theme-button"
                testid="theme"
                onClick={toggleTheme}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/dark-theme-img.png"
                  className="theme-img"
                  alt="theme"
                />
              </button>
            </div>
          ) : (
            <div className="nav-bar-container-dark">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2/2235.png"
                className="website-logo"
                alt="website logo"
              />
              <ul className="middle-items">
                <li className="list-item">
                  <Link to="/" className="link-light">
                    Home
                  </Link>
                </li>
              </ul>
              <button
                type="button"
                className="theme-button"
                testid="theme"
                onClick={toggleTheme}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/light-theme-img.png"
                  className="theme-img"
                  alt="theme"
                />
              </button>
            </div>
          )}
        </>
      )
    }}
  </ThemeContext.Consumer>
    )
}

export default Navbar