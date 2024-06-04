import React from 'react';

const Card = ({ card, addToDeck, expandedCard, setExpandedCard }) => {
  const { id, name, card_images, type, atk, def, desc } = card;

  const handleDescriptionToggle = () => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div key={id} className='card--list--item'>
      <h2>{name}</h2>
      <img src={card_images[0].image_url_small} alt={name} />
      <p><strong>Type : </strong> {type}</p>
      {atk && <p><strong>ATK : </strong> {atk}</p>}
      {def && <p><strong>DEF : </strong> {def}</p>}
      <p className='desc'>
        <strong>Description : </strong> 
        {expandedCard === id ? desc : `${desc.slice(0, 150)}${desc.length > 150 ? '...' : ''}`}
        {desc.length > 150 && (
          <p onClick={handleDescriptionToggle}>
            {expandedCard === id ? ' Show less' : ' Show more'}
          </p>
        )}
      </p>
      {addToDeck && <button onClick={() => addToDeck(card)}>Add to Deck</button>}
    </div>
  );
};

export default Card;