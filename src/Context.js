import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios'


const Context = createContext();

function ContextProvider(props){

    const [pokemons, setPokemons] = useState([])
    const [pokemon, setPokemon] = useState([])
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

    function getPokemonDetails(id){
        let url = path + id

        axios.get(url)
            .then( (response) => {
            setPokemon(response.data)
            }).catch( (error) => {
            console.log(error)
            })
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
            setPokemon(prevPokemon => (
                prevPokemon.id === id ?
                {...prevPokemon, 
                isFavorite: !prevPokemon.isFavorite} :
                prevPokemon
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
            setPokemon(prevPokemon => (
                prevPokemon.id === id ?
                {...prevPokemon, 
                isFavorite: !prevPokemon.isFavorite} :
                prevPokemon
            ))
            setChanging(prevChanging => !prevChanging)}
            ).catch( (error) => {
            console.log(error)
            })
    }

    return (
        <Context.Provider value={{pokemon, pokemons, list, getAll, getFavorite, getPokemonDetails, toggleFavPokemon, toggleUnFavPokemon, toggleList, toggleGrid}}>
            {props.children}
        </Context.Provider>
    );
}

export {ContextProvider, Context};