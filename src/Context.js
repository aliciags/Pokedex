import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios'

import Pokemon from './components/PokemonCard'

const Context = createContext();

function ContextProvider(props){

    const [pokemons, setPokemons] = useState([])
    const [favorite, setFavorite] = useState(false)
    const [changing, setChanging] = useState(false)
    const [list, setList] = useState(false)

    const path = 'https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/'
    
    useEffect(() => {
        let url = path
        if(favorite){
            url = url + '?isFavorite=true'
        }
        axios.get(url)
            .then( (response) => {
            setPokemons(response.data.items)
            }).catch( (error) => {
            console.log(error)
            })
    }, [favorite, changing] )

    function getFavorite(){
        setFavorite(true)
    }

    function getAll(){
        setFavorite(false)
    }

    function toggleList(){
        setList(true)
    }

    function toggleGrid(){
        setList(false)
    }

    function toggleFavPokemon(id){
        
        axios.post(path + id + '/favorite')
            .then(             
            (response) => {
            setPokemons(prevPokemons => (
                prevPokemons.map(pokemon => (
                    pokemon.id === id ?
                    {...pokemon, 
                    isFavorite: response.data.isFavorite} : 
                    pokemon
                ))
            ))
            setChanging(prevChanging => !prevChanging)}
            ).catch( (error) => {
            console.log(error)
            })

    }

    function toggleUnFavPokemon(id){

        axios.post(path + id + '/unfavorite')
            .then(
            (response) => {
            setPokemons(prevPokemons => (
                prevPokemons.map(pokemon => (
                    pokemon.id === id ?
                    {...pokemon, 
                    isFavorite: response.data.isFavorite} : 
                    pokemon
                ))
            ))
            setChanging(prevChanging => !prevChanging)}
            ).catch( (error) => {
            console.log(error)
            })
    }

    return (
        <Context.Provider value={{pokemons, list, getAll, getFavorite, toggleFavPokemon, toggleUnFavPokemon, toggleList, toggleGrid}}>
            {props.children}
        </Context.Provider>
    );
}

export {ContextProvider, Context};