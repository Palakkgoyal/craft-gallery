import React from 'react'
import "./Navbar.css"

import { useState, useEffect } from 'react';
import useAuthChange from "../../js/useAuthChange"
import { Link, useNavigate } from 'react-router-dom';
import { logo } from "../../assets"
import { auth } from '../../lib/firebase';

import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { ImCross } from "react-icons/im";

import LoginDialogBox from '../LoginDialogBox/LoginDialogBox';

const Navbar = () => {
  const [showAuthForm, setShowAuthForm] = useState(false)
  const [showNavigation, setShowNavigation] = useState(false)
  const windowWidth = useWindowWidth(700);
  const currentUser = auth.currentUser

  const user = useAuthChange()
  const navigate = useNavigate()

  function handleShowForm() {
    setShowAuthForm(prev => !prev)
  }

  const isSmallScreen = windowWidth <= 700

  function hideNavigation() {
    if (windowWidth <= 700) {
      setShowNavigation(false)
    }
  }

  return (
    <div>
      <header className="nav_container">
        <h2 className="logo">
          The Craft Galleryy
        </h2>
        <img src={logo}
          alt="The Craft Gallery"
          className="img_logo"
          onClick={() => navigate("/")}
        />

        <nav className={`nav_list_main_container ${isSmallScreen && showNavigation && "show_nav"}`}>
          {isSmallScreen && (
            <ImCross className="nav_close_icon" onClick={hideNavigation} />)
          }
          <ul className="nav_list_container">
            <li>
              <Link to={"/"} className="nav_links" onClick={hideNavigation}>
                Home
              </Link>
            </li>
            <li>
              <Link to={"/gallery"} className="nav_links" onClick={hideNavigation}>
                Gallery
              </Link>
            </li>
            <li>
              <Link to={"/about"} className="nav_links" onClick={hideNavigation}>
                About
              </Link>
            </li>
            <li>
              <Link to={"/contact"} className="nav_links" onClick={hideNavigation}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="nav_icons_container">
          <AiOutlineShoppingCart className="nav_icons" onClick={() => navigate("/gallery")} />
          <div>
            {!currentUser ? (
              <button
                className="login_btn"
                onClick={() => user ? navigate("/profile") : handleShowForm()}
              >
                {(<FaUserCircle />)}
              </button>
            ) : (
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName}
                className="nav_user_img"
                onClick={() => user ? navigate("/profile") : handleShowForm()}
              />
            )}
          </div>
          <FiMenu
            className="nav_icons menu_icon"
            onClick={() => setShowNavigation(prev => !prev)}
          />
        </div>
      </header>
      {showAuthForm && <LoginDialogBox handleShowForm={handleShowForm} />}
    </div>
  )
}

export default Navbar


function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(700);

  function getWindowDimensions() {
    const { innerWidth: width } = window;
    return width;
  }

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowDimensions());
    }

    handleResize()

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}