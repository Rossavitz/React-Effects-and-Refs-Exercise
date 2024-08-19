import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
  const [deck, setDeck] = useState([]);
  const [dealt, setDealt] = useState([]);

  useEffect(function getDeckFromAPI() {
    async function fetchDeck() {
      const deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
      setDeck(deck.data);
    }
    fetchDeck();
  }, []);

  async function dealCard() {
    try {
      const dealtRes = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);
      if (dealtRes.data.remaining === 0) alert("Error: no cards remaining!");
      const card = dealtRes.data.cards[0];

      setDealt((d) => [
        ...d,
        {
          id: card.code,
          name: card.suit + "of" + card.value,
          image: card.image,
        },
      ]);
    } catch (err) {
      alert(err);
    }
  }

  async function shuffleDeck() {
    try {
      await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle`);
      setDealt([]);
    } catch (err) {
      alert(err);
    }
  }

  const cardMap = dealt.map((c) => (
    <Card key={c.id} name={c.name} img={c.image} />
  ));
  return (
    <div className="Deck">
      <button onClick={dealCard}>Deal Card!</button>
      <button onClick={shuffleDeck}>Shuffle Deck!</button>
      <div className="Deck-carddiv">{cardMap}</div>
    </div>
  );
}
export default Deck;
