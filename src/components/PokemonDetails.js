import React, {useContext} from 'react'
import {useParams} from 'react-router-dom'
import {FaArrowLeft, FaWeight, FaRulerVertical} from 'react-icons/fa'
import {AiFillStar, AiOutlineStar, AiFillSound} from 'react-icons/ai';

import {Context} from '../Context'

import {getColor} from '../utils/pokemon-type-colors'

export default function PokemonDetails(){

    const {pokemon, getPokemonDetails, toggleFavPokemon, toggleUnFavPokemon} = useContext(Context)
    const {pokemonid} = useParams()

    function handleClick(id){
        pokemon.isFavorite ? toggleUnFavPokemon(id) : toggleFavPokemon(id)
    }

    React.useEffect(() => {
        getPokemonDetails(pokemonid)
    }, [])

    console.log(pokemon)

    return (
        pokemon.length !== 0 ?
        <div className='pokemon-details' id={pokemon.id} style={{background: getColor(pokemon.types[0].toLowerCase())}}>
            <header className='pokemon-details-header'>
                <div className='pokemon-details-header-right'>
                    <FaArrowLeft className='pokemon-details-arrow'/>
                    <div className='pokemon-details-header-content'>
                        <p className='pokemon-details-number'>#{pokemon.id}</p>
                        <h1 className='pokemon-details-name'>{pokemon.name}</h1>
                    </div>
                </div>
                {pokemon.isFavorite ?
                <AiFillStar className='pokemon-details-favorite' onClick={() => handleClick(pokemon.id)}/>:
                <AiOutlineStar className='pokemon-details-favorite' onClick={() => handleClick(pokemon.id)}/>}
            </header>
            <img className='pokemon-details-img' src={pokemon.image} alt='Not found'/>
            <div className='pokemon-details-container'>
                <div className='pokemon-details-types'>
                    {pokemon.types.map((type, i) => (
                        <p key={i} className='pokemon-details-type' style={{background: getColor(type.toLowerCase())}}>{type}</p>
                    ))}
                </div>
                <p className='pokemon-details-about' style={{color: getColor(pokemon.types[0].toLowerCase())}}>About</p>
                <div className='pokemon-details-about-details'>
                    <div className='pokemon-details-about-data'>
                        <FaWeight className='pokemon-details-btn'/>
                        <p className='pokemon-details-about-min-max'>{`${pokemon.weight.minimum} - ${pokemon.weight.maximum}`}</p>
                    </div>
                    <div className='pokemon-details-about-data'>
                        <FaRulerVertical className='pokemon-details-btn'/>
                        <p className='pokemon-details-about-min-max'>{`${pokemon.height.minimum} - ${pokemon.height.maximum}`}</p>
                    </div>
                    <div className='pokemon-details-about-data'>
                        <AiFillSound className='pokemon-details-btn' onClick={() => new Audio(pokemon.sound).play()}/>
                        <p className='pokemon-details-about-data-title'>Sound</p>
                    </div>
                </div>
            </div>
        </div> :
        <h1>Loading...</h1>
    )
}