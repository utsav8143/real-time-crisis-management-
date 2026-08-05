import React from 'react'
import Header from '../components/landing/Header.jsx'
import Hero from '../components/landing/Hero.jsx'

const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className="ms-53 me-48">
      <Hero/>
      </div>
    </div>
  )
}

export default LandingPage
