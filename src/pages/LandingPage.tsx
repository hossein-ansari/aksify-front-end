import React from 'react';

import Header from '../components/Header/Header'
import FirstPart from '../components/landingPage/firstPart/Firstpart'
import SecondPart from '../components/landingPage/secondPart/SecondPart'
import ThirdPart from '../components/landingPage/ThirdPart/ThirdPart'
import Footer from '../components/footer/Footer';


function LandingPage() {
  return (
    <div className="App">
      <Header />
      <FirstPart />
      <SecondPart />
      <ThirdPart />
      <Footer />
    </div>
  );
}

export default LandingPage;
