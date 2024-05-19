import React from 'react';
import './index.css';

import LHeader from './components/landingPage/Header/Header'
import FirstPart from './components/landingPage/firstPart/Firstpart'
import SecondPart from './components/landingPage/secondPart/SecondPart'
import ThirdPart from './components/landingPage/ThirdPart/ThirdPart'


function LandingPage() {
  return (
    <div className="App">
      <LHeader />
      <FirstPart />
      <SecondPart />
      <ThirdPart />
    </div>
  );
}

export default LandingPage;
