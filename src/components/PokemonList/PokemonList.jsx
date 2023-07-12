import React, { useState, useEffect } from 'react';
import CardPokemon from '../card/CardPokemon';
import Pagination from '../Pagination/Pagination';
import "./PokemonList.css"

  const PokemonList = ({ data, select }) => {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonSearch, setPokemonSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonCount, setPokemonCount] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);

  const resultsPerPage = 20;

  useEffect(() => {
    const fetchPokemonsByType = async () => {
      if (select) {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${select}`);
        const data = await response.json();

        const pokemonNames = data.pokemon.map((entry) => entry.pokemon.name);

        const pokemonDetailsPromises = pokemonNames.map((name) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then((res) => res.json())
            .catch((error) => error)
        );

        const pokemonDetails = await Promise.all(pokemonDetailsPromises);

        const pokemonData = pokemonDetails.map((result) => ({
          id: result.id,
          name: result.name[0].toUpperCase() + result.name.slice(1),
          image: result.sprites['front_default'],
          type: result.types.map((type) => type.type.name).join(', '),
          abilities: result.abilities
            .filter((abilities) => !abilities.is_hidden)
            .map((abilities) => abilities.ability.name)
            .join(', '),
          abilitieshidden: result.abilities
            .filter((abilities) => abilities.is_hidden)
            .map((abilities) => abilities.ability.name)
            .join(', '),
          types: result.types.map((types) => types.type.name).join(', '),
          weight: result.weight,
          typeCard: result.types[0].type.name.toLowerCase(),
          hp: result.stats[0].base_stat,
          attack: result.stats[1].base_stat,
          defense: result.stats[2].base_stat,
          special_attack: result.stats[3].base_stat,
          special_defense: result.stats[4].base_stat,
          speed: result.stats[5].base_stat,
        }));
        setPokemon(pokemonData);
      }
      if (select === "") {
        setPokemon(pokemonData);
      }
    };

    fetchPokemonsByType();
  }, [select, pokemonData]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010');
        const data = await response.json();
        setPokemonSearch(data.results);
      } catch (error) {
      }
    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    const findPokemon = () => {
      if (typeof data === 'string' && pokemonSearch && pokemonSearch.length > 0) {
        const foundPokemon = pokemonSearch.find((item) => item.name.toUpperCase() === data.toUpperCase());
        if (foundPokemon) {
          const promises = [];

          const url = foundPokemon.url;
          promises.push(fetch(url).then((res) => res.json()));
          Promise.all(promises).then((results) => {
            const pokemonData = results.map((result) => ({
              id: result.id,
              name: result.name[0].toUpperCase() + result.name.slice(1),
              image: result.sprites['front_default'],
              type: result.types.map((type) => type.type.name).join(', '),
              abilities: result.abilities
                .filter((abilities) => !abilities.is_hidden)
                .map((abilities) => abilities.ability.name)
                .join(', '),
              abilitieshidden: result.abilities
                .filter((abilities) => abilities.is_hidden)
                .map((abilities) => abilities.ability.name)
                .join(', '),
              types: result.types.map((types) => types.type.name).join(', '),
              weight: result.weight,
              typeCard: result.types[0].type.name.toLowerCase(),
              hp: result.stats[0].base_stat,
              attack: result.stats[1].base_stat,
              defense: result.stats[2].base_stat,
              special_attack: result.stats[3].base_stat,
              special_defense: result.stats[4].base_stat,
              speed: result.stats[5].base_stat,
            }));
            setPokemon(pokemonData);
          });
        }
        if (!foundPokemon) {
          setPokemon(pokemonData);
        }
      }
    };

    findPokemon();
  }, [data, pokemonSearch, pokemonData]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then((response) => response.json())
      .then((data) => {
        setPokemonCount(data.count - 271);
      })
      .catch((error) => {
      });
  }, []);

  useEffect(() => {
    let promises = [];
    let offset = (currentPage - 1) * resultsPerPage;
    let offsetResultsPerPage = offset + resultsPerPage

    if (offsetResultsPerPage >= 1010) {
      offsetResultsPerPage = 1010
    }
    for (let i = offset + 1; i <= offsetResultsPerPage; i++) {
      let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
      let pokemonData = results.map((result) => ({
        id: result.id,
        name: result.name[0].toUpperCase() + result.name.slice(1),
        image: result.sprites['front_default'],
        type: result.types.map((type) => type.type.name).join(', '),
        abilities: result.abilities
          .filter((abilities) => !abilities.is_hidden)
          .map((abilities) => abilities.ability.name)
          .join(', '),
        abilitieshidden: result.abilities
          .filter((abilities) => abilities.is_hidden)
          .map((abilities) => abilities.ability.name)
          .join(', '),
        types: result.types.map((types) => types.type.name).join(', '),
        weight: result.weight,
        typeCard: result.types[0].type.name.toLowerCase(),
        hp: result.stats[0].base_stat,
        attack: result.stats[1].base_stat,
        defense: result.stats[2].base_stat,
        special_attack: result.stats[3].base_stat,
        special_defense: result.stats[4].base_stat,
        speed: result.stats[5].base_stat,
      }));

      setPokemon(pokemonData);
      setPokemonData(pokemonData);

    });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPokemon = pokemonCount;
  const totalPages = Math.ceil(totalPokemon / resultsPerPage);

  return (
    <>
      <div className='col-12'>
        {
          (
            pokemon.map(pokemon => (
              <CardPokemon key={pokemon.id} data={pokemon} />
            ))
          )
        }
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
};

export default PokemonList;
