import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (event) => {
    onSearch(event.target.value);

    setSearchTerm(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <input
        className="form-control mr-sm-2"
        type="text"
        placeholder="Buscar Pokémon"
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
    </form>
  );
};

export default SearchBar;
