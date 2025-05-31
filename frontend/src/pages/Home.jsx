import React from 'react'
import Pizarra from '../components/Pizarra';
import PizarraIn from '../components/PizarraIn';



function  Home() {
  function logout() {
    localStorage.clear();
    window.location.href = '/login';
    console.log("Deslogeado")
  }
  return (
    <div>
    <PizarraIn />
    <Pizarra />
    <button onClick={logout}>Deslogeate we</button>
    <button onClick={() => window.location.href = '/chats'}>chats</button>
    </div>
  )
}

export default Home;

