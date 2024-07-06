import React from 'react'
import Navbar from "../components/Navbar"
import Announcements from '../components/Announcements'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Productings from "../components/productings"
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
const Home = () => {
  return (
    <div>
      <Announcements/>
      <Navbar/>
      <Slider/>
      <Categories/>
      <Productings/>
      <Newsletter/>
      <Footer/>
    </div>
  )
}

export default Home
