import React from 'react'
import Header from '../components/landing/Header.jsx'
import Hero from '../components/landing/Hero.jsx'
import Pipeline from '../components/landing/Pipeline.jsx'
import Map from '../components/landing/Map.jsx'
import Features from '../components/landing/Features.jsx'
import AIClassification from '../components/landing/AI-Classification.jsx'
import Live from '../components/landing/Live.jsx'
import Footer from '../components/landing/Footer.jsx'

const LandingPage = () => {
  return (
    <div>
      <Header />
     
      <div className="lg:ms-53 lg:me-48 ms-6 me-6">
       <Hero/>
      <Pipeline />
      <Map/>
      <Features/>
      <AIClassification/>
      <Live/>
      <Footer/>
      </div>
    </div>
  )
}

export default LandingPage
