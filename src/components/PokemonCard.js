import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {Context} from '../Context'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

function Pokemon({pokemon, className}) {

    const {toggleFavPokemon, toggleUnFavPokemon} = useContext(Context)

    function handleClick(id){
        pokemon.isFavorite ? toggleUnFavPokemon(id) : toggleFavPokemon(id)
    }

    return (
        <div className={className} id={pokemon.id}>
            <header className={`${className}-header`}>#{pokemon.id}</header>
            <Link to={`/pokemon/${pokemon.id}`}>
                <img className={`${className}-img`} src={pokemon.image} alt='Not found'/>
            </Link>
            <footer className={`${className}-footer`}>
                <div className="pokemon-footer-data">
                    <h1 className="pokemon-name">{pokemon.name}</h1>
                    <p className="pokemon-types">{pokemon.types.join(', ')}</p>
                </div>
                {pokemon.isFavorite ?
                <AiFillStar className='pokemon-footer-favorite' onClick={() => handleClick(pokemon.id)}/>:
                <AiOutlineStar className='pokemon-footer-favorite' onClick={() => handleClick(pokemon.id)}/>}
            </footer>
        </div>
    )
}
    
export default Pokemon