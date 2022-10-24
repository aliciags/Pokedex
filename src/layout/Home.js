import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import { BsFillGridFill, BsList } from 'react-icons/bs'

import Pokemon from '../components/PokemonCard'

import {Context} from '../Context'

export default function Home(){

    const {pokemons, list, getAll, getFavorite, toggleList, toggleGrid} = useContext(Context)
    const pokemonsElem = pokemons.map(pokemon => 
        <Pokemon 
            key={pokemon.id}
            pokemon={pokemon}
            className={list ? 'pokemon-col' : 'pokemon-row'}
        />)
    const styles = {
        flexDirection: list ? 'column' : 'row'
    }

    return (
        <div>
            <nav className='navbar'>
                <div>
                    <Link onClick={getAll} className='link' to='/'>All</Link>
                    <Link onClick={getFavorite} className='link' to='/favorite'>Favorite</Link>
                </div>
                <div>
                    <BsFillGridFill className='nav-btn' onClick={toggleGrid}/>
                    <BsList className='nav-btn' onClick={toggleList}/>
                </div>
            </nav>

            <div className='pokemons' style={styles}>
                {pokemonsElem}
            </div>
        </div>
    )
}
