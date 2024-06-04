// src/App.js
import React, { useState } from 'react';
import {  Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavBar';
import CardList from './Components/CardList';
import Deck from './Components/Deck';

function App() {
  const [deck, setDeck] = useState(JSON.parse(localStorage.getItem('deck')) || []);

  const addToDeck = (card) => {
    const updatedDeck = [...deck, card];
    setDeck(updatedDeck);
    localStorage.setItem('deck', JSON.stringify(updatedDeck));
  };

  return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<CardList addToDeck={addToDeck} />} />
          <Route path="/deck" element={<Deck />} />
        </Routes>
      </div>
  );
}

export default App;
