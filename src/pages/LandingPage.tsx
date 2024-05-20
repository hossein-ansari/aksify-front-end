import React from 'react';

import Header from '../components/Header/Header'
import FirstPart from '../components/landingPage/firstPart/Firstpart'
import SecondPart from '../components/landingPage/secondPart/SecondPart'
import ThirdPart from '../components/landingPage/ThirdPart/ThirdPart'


function LandingPage() {
  return (
    <div className="App">
      <Header />
      <FirstPart />
      <SecondPart />
      <ThirdPart />
    </div>
  );
}

export default LandingPage;
