import React from "react";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";

function Home() {
  return (
    <div className="home-container">
      <div className="logo-container">
        <Logo />
        <h1>
          Fin
          <span className="highlighted-text">Search</span>
        </h1>

      </div>
      <SearchBar />
    </div>
  );
}

export default Home;
