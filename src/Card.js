import React from "react";
import "./Card.css";

//Single card compoenent

function Card({ name, img }) {
  return <img className="Deck-card" src={img} alt={name} />;
}

export default Card;
