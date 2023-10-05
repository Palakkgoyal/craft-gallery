import React from 'react'
import "./Home.css"
import { Hero, Testimonial, Footer, MoreAboutUs } from '../../Components'

const Home = () => {
  return (
    <div className="home_main_container">
      <Hero />
      <Testimonial />
      <MoreAboutUs />
      <Footer/>
    </div>
  )
}

export default Home
