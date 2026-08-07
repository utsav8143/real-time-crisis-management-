import React from 'react'
import Header from '../components/landing/Header.jsx'
import Hero from '../components/landing/Hero.jsx'
import Pipeline from '../components/landing/Pipeline.jsx'

const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className="lg:ms-53 lg:me-48 ms-6 me-6">
      <Hero/>
      <Pipeline />
      </div>
    </div>
  )
}

export default LandingPage
