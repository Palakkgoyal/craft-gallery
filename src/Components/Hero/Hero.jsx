import React from 'react'
import "./Hero.css"
import { heroImg } from "../../assets"
import ActionBtn from "../ActionBtn/ActionBtn"

const Hero = () => {
  return (
    <div className="hero_container">
      <div className="hero_img_container">
        <img src={heroImg} alt="" className="img_sizing" />
      </div>
      <div className="hero_sub_container">
        <h1 className="hero_heading">
          Welcome to The Craft Galleryy
        </h1>
        <p className="hero_para">
          Your ideas and preferences, combined with our creativity...
          <br />
          Providing you High-quality products in affordable price.
        </p>
        <div style={{marginTop: "30px"}}>
          <ActionBtn text="Get Your now" />
        </div>
      </div>
    </div>
  )
}

export default Hero
