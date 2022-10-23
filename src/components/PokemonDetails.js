import React, {useContext} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {Context} from '../Context'

export default function PokemonDetails(){

    const {pokemonid} = useParams()
    const [pokemon, setPokemon] = React.useState(false)

    let [fav, setFav] = React.useState(pokemon.isFavorite)
    const {toggleFavPokemon, toggleUnFavPokemon} = useContext(Context)

    function handleClick(id){
        fav ? toggleUnFavPokemon(id) : toggleFavPokemon(id)
        setFav( prevFav => !prevFav)
    }

    React.useEffect(() => {

        let url = 'https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/' + pokemonid

        axios.get(url)
            .then( (response) => {
            console.log('here')
            console.log('response', response.data)
            setPokemon(response.data)
            }).catch( (error) => {
            console.log(error)
            })
    }, [])

    return (
        pokemon ?
        <div className="pokemon" id={pokemon.id}>
            <header className="pokemon-header">#{pokemon.id}</header>
            <img className="pokemon-img" src={pokemon.image} alt='Not found'/>
            <footer className="pokemon-footer">
                <div className="pokemon-footer-data">
                    <h1 className="pokemon-name">{pokemon.name}</h1>
                    <p className="pokemon-types">{pokemon.types.join(', ')}</p>
                </div>
                <button className="pokemon-footer-favorite" onClick={() => handleClick(pokemon.id)}>{fav ? 'Y' : 'N'}</button>
            </footer>
        </div> :
        <h1>Loading...</h1>
    )
}