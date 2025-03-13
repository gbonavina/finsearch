import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/search.png"; 

function SearchBar() {
  const [inputValue, setInputValue] = useState(""); 
  const navigate = useNavigate();

  const handleSearch = async () => {
    console.log("Função handleSearch() foi chamada!");

    if (inputValue.trim() !== "") {
      console.log(`Redirecionando para: /ativo/${inputValue.trim()}`);
      navigate(`/ativo/${inputValue.trim()}`);
    }
  };

  // Função que captura a tecla ENTER
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Digite o ticker do ativo"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress} 
      />
      <button onClick={handleSearch}>
        <img src={searchIcon} alt="Buscar" />
      </button>
    </div>
  );
}

export default SearchBar;
