import React from "react";
import logo from "../assets/logo.png"; // Certifique-se de que esse caminho está correto

function Logo(props) {
  return (
    <img 
      src={logo} 
      alt="Logo" 
      className={props.className} 
    />
  );
}

export default Logo;

