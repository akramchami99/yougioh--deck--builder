import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import '../Styles/Deck.css';

const Deck = () => {
  const [deck, setDeck] = useState([]);
  const [storedDeck, setStoredDeck] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setIsSearching] = useState(false);

  const searchCards = async () => {
    if (searchQuery) {
      setIsSearching(true);
      try {
        const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${searchQuery}`);
        setSearchResults(response.data.data);
      } catch (error) {
        if (error.response.status === 400) {
          alert('No card found');
        }
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSearch = () => {
    searchCards();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  useEffect(() => {
    const storedDeck = JSON.parse(localStorage.getItem('deck')) || [];
    setDeck(storedDeck);
    setStoredDeck(storedDeck);
  }, []);

  const removeCard = (cardId) => {
    const updatedDeck = deck.filter(card => card.id !== cardId);
    setDeck(updatedDeck);
    localStorage.setItem('deck', JSON.stringify(updatedDeck));
  };

  const deleteAllCards = () => {
    setDeck([]);
    localStorage.removeItem('deck');
  };

  return (
    <div className='deck--main'>
      <h1>Your Deck</h1>
      <div className='deck--tabs'>
        <div className='deck--list'>
          <div className='card--list'>
            {deck.map(card => (
              <div key={card.id}>
                <Card
                  card={card}
                  removeCard={removeCard}
                  expandedCard={expandedCard}
                  setExpandedCard={setExpandedCard}
                />
              </div>
            ))}
          </div>
          {deck === "" ? <h3>Add some cards to your deck</h3>: <button onClick={deleteAllCards}>Delete All Cards</button>}
        </div>
        <div className='search--main'>
          <div className='search--bar'>
            <input
              type='search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search for a card by name'
            />
            <button onClick={handleSearch} disabled={searching}>Search</button>
            <button onClick={handleClearSearch}>Clear</button>
          </div>
          <div className='search--results'>
            {searching ? (
              <p>Searching...</p>
            ) : (
              searchResults.length > 0 ? (
                searchResults.map((card) => (
                  <div key={card.id}>
                    <Card
                      card={card}
                      removeCard={removeCard}
                      expandedCard={expandedCard}
                      setExpandedCard={setExpandedCard}
                    />
                  </div>
                ))
              ) : (
                <p>No card found</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deck;