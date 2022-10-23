import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {Context} from '../Context'

function Pokemon({pokemon, className}) {

    let [fav, setFav] = React.useState(pokemon.isFavorite)
    const {toggleFavPokemon, toggleUnFavPokemon} = useContext(Context)

    function handleClick(id){
        fav ? toggleUnFavPokemon(id) : toggleFavPokemon(id)
        setFav( prevFav => !prevFav)
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
                <button className="pokemon-footer-favorite" onClick={() => handleClick(pokemon.id)}>{fav ? 'Y' : 'N'}</button>    
            </footer>
        </div>
    )
}
    
export default Pokemon