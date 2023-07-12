import { Link, /* Outlet */ } from "react-router-dom";
import SearchBar from './SearchBar';
import React, { useState, useEffect } from 'react';
import PokemonList from '../../components/PokemonList/PokemonList';
import "./style.css"
const Navbar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/type');
      const data = await response.json();
      setTypes(data.results);
    };

    fetchTypes();
  }, []);


  const handleSearch = (term) => {
    setSearchResults(term);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <>
      <nav className="navbar bg-danger mb-5 ">
        <div className="container">
          <Link className="navbar-brand text-light" to="/">Poke app</Link>
          <div className="d-flex justify-end text-light">
            {/*             <Link className="navbar-brand text-light mx-5" to="/habilidades/">Habilidades</Link>
            <Link className="navbar-brand text-light" to="/">Pk</Link>
            <Link className="navbar-brand text-light" to="/">Pk</Link>
            <Link className="navbar-brand text-light" to="/">Pk</Link> */}
            <SearchBar onSearch={handleSearch} />
            <select className="form-select" value={selectedType} onChange={handleTypeChange}>
              <option value="">Todos los tipos</option>
              {types.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>
      <PokemonList data={searchResults} select={selectedType} />

      {/*       <Outlet />
 */}    </>

  )
}

export default Navbar