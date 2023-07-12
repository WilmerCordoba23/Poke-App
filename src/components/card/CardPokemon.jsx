import React, { useEffect, useState } from 'react'
/* import { Link } from "react-router-dom"; */
import "./CardPokemon.css"

const CardHeroe = ({ data }) => {
  const [pokemon, setPokemon] = useState([data]);

  useEffect(() => {
    setPokemon(data)
  }, [data])

  return (

    <figure className={` card card--${pokemon.typeCard}`}>
      <div className="card__image-container">

        <img src={pokemon.image} alt={`${pokemon.name} card`} className="card__image" />
      </div>

      <figcaption className="card__caption">
        <h1 className="card__name">{pokemon.name}</h1>

        <h3 className="card__type">
          {pokemon.types}
        </h3>

        <table className="card__stats">
          <tbody><tr>
            <th>HP</th>
            <td>{pokemon.hp}</td>
          </tr>
            <tr>
              <th>Attack</th>
              <td>{pokemon.attack}</td>
            </tr>

            <tr>
              <th>Defense</th>
              <td>{pokemon.defense}</td>
            </tr>

            <tr>
              <th>Special Attack</th>
              <td>{pokemon.special_attack}</td>
            </tr>
            <tr>
              <th>Special Defense</th>
              <td>{pokemon.special_defense}</td>
            </tr>
            <tr>
              <th>Speed</th>
              <td>{pokemon.speed}</td>
            </tr>
          </tbody></table>

        <div className="card__abilities">
          <h4 className="card__ability">
            <span className="card__label">Ability</span>
            {pokemon.abilities}
          </h4>
          <h4 className="card__ability">
            <span className="card__label">Hidden Ability</span>
            {pokemon.abilitieshidden}
          </h4>
        </div>
      </figcaption>
    </figure>

  )
}

export default CardHeroe