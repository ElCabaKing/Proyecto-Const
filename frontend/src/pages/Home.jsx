import React from 'react'
import Pizarra from '../components/Pizarra';
import PizarraIn from '../components/PizarraIn';
import Header from '../components/Header';
import '../styles/General.css';

function Home() {
  return (
    <div className="home-bg">
      <Header />
      <main className="home-main">
        <h1 className='home-title'>¡Bienvenido a la Pizarra!</h1>
        <div className="home-content">
          <PizarraIn />
          <Pizarra />
        </div>
      </main>
    </div>
  );
}

export default Home;



