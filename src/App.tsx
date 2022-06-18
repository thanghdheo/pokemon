import React, { useEffect, useState } from "react";
import "./App.css";
import PokemonCollection from "./components/PokemonCollection";
import axios from 'axios'

export interface Pokemons {
  id:number;
  name:string;
  sprites:{
    front_default:string
  }
}

export interface PokemonDetail extends Pokemons{
  abilities?: {
    ability:string
    name:string
  }[]
}

export interface Detail{
  id:number;
  isOpen: boolean;
}


function App() {
  const [pokemons,setPokemons] = useState<Pokemons[]>([])
  const [nextUrl,setNextUrl] = useState<string>("")
  const [loading,setLoading] = useState<boolean>(true)
  const [idDetail,setIdDetail] = useState<Detail>({
    id:0,
    isOpen:false,
  })

  useEffect(() => {
    const getPokemons = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=20')
      setNextUrl(res.data.next)
      res.data.results.forEach(async(pokemon:Pokemons )=> {
        const pokeItem = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        setPokemons( prev => [...prev,pokeItem.data])
        setLoading(false)
      })
    }
    getPokemons()
  },[]) 

  console.log(pokemons)

  const loadNextUrl = () =>{
    setLoading(true)
    const getNextUrl = async () => {
      const res = await axios.get(nextUrl)
      res.data.results.map(async(pokemon:Pokemons) => {
        const pokeItem = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        setPokemons( prev => [...prev,pokeItem.data])
        setLoading(false)
      })
    }
    getNextUrl()
  }

  return (
    <div>
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection pokemons={pokemons} idDetail={idDetail} setIdDetail={setIdDetail} />
        {!idDetail.isOpen &&
        <div className="btn">
          <button onClick={loadNextUrl}>{loading? 'Loading....' : 'Load more'}</button>
        </div>
        }
      </div>
    </div>
  );
}

export default App;

