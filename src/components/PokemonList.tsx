import React, { useEffect, useState } from "react";
import { Detail } from "../App";
import "./pokemon.css";

interface Props {
  id: number;
  name: string;
  image: string;
  idDetail: Detail;
  setIdDetail: React.Dispatch<React.SetStateAction<Detail>>;
  abilities:
  | {
      name: string;
      ability: string;
    }[]
  | undefined;
}

const PokemonList: React.FC<Props> = (props) => {
  const { id, name, image, idDetail, setIdDetail,abilities } = props;
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    setSelected(id === idDetail.id);
  }, [idDetail]);

  const closeSelected = () => {
    setIdDetail({
      id:0,
      isOpen:false
    })
  }

  return (
    <div className="">
      {selected ? (
        <section className="pokemon-list-detailed">
        <div className="detail-container">
          <p className="detail-close" onClick={closeSelected} >X</p>
          <div className="detail-info">
            <img src={image} alt={name} className="detail-img" />
            <p className="detail-name">{name}</p>
          </div>
          <div className="detail-skill">
            <p className="detail-ability">
              Abilities:
              {abilities?.map((ab: any) => {
                return <div className="">{ab.ability.name}</div>;
              })}
            </p>
          </div>
        </div>
      </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name">{name}</p>
          <img src={image} alt={name} />
        </section>
      )}
    </div>
  );
};

export default PokemonList;
