import React from "react";
import { Detail, PokemonDetail, Pokemons } from "../App";
import PokemonList from "./PokemonList";
import "./pokemon.css";

interface Props {
  pokemons: PokemonDetail[];
  idDetail: Detail;
  setIdDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons, idDetail, setIdDetail } = props;
  const selectIdPoke = (id: number) => {
    if(!idDetail.isOpen){
    setIdDetail({
      id:id,
      isOpen:true
    })
  }
  };
  return (
    <>
       <section className={idDetail.isOpen? 'collection-container-active' : 'collection-container'}>
            {idDetail.isOpen? (
                <div className="overlay"></div>
            ):(
                <div className=""></div>
            )}
        {pokemons.map((poke) => (
          <div className="" onClick={() => selectIdPoke(poke.id)}>
            <PokemonList
              key={poke.id}
              idDetail={idDetail}
              setIdDetail={setIdDetail}
              id={poke.id}
              abilities={poke.abilities}
              image={poke.sprites.front_default}
              name={poke.name}
            />
          </div>
        ))}
      </section>
    </>
  );
};

export default PokemonCollection;
