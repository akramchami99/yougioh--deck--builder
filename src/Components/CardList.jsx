import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import '../Styles/CardList.css'

const CardList = ({ addToDeck }) => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCard, setExpandedCard] = useState(null);
  const cardsPerPage = 20;

  useEffect(() => {
    axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php')
      .then(response => {
        setCards(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching the card data:', error);
      });
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const nextPage = () => {
    if (currentPage < Math.ceil(cards.length / cardsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='card--list--main'>
      <h1>Yu-Gi-Oh! Cards</h1>
      <div className='card--list'>
        {currentCards.map(card => (
          <Card
            key={card.id}
            card={card}
            addToDeck={addToDeck}
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
          />
        ))}
      </div>
      <div className='navigation--buttons'>
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(cards.length / cardsPerPage)}>Next</button>
      </div>
    </div>
  );
};

export default CardList;