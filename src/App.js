import './App.css'
import React from 'react'
import {Routes, Route} from 'react-router-dom'

import Home from './layout/Home'
import PokemonDetails from './components/PokemonDetails'

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/favorite' element={<Home />} />
        <Route path='/pokemon/:pokemonid' element={<PokemonDetails />} />
      </Routes>
    </div>
  )
}

export default App