import React from 'react';

const RestaurantCard = ({ name, cuisine, rating, isOpen }) => {
  return (
    <div className="restaurant-card">
      <div className="restaurant-card-banner"></div>
      <div className="restaurant-card-body">
        <div className="restaurant-card-header">
          <h3>{name}</h3>
          <span className={`badge ${isOpen ? 'badge-open' : 'badge-closed'}`}>
            {isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>

        <p className="restaurant-card-cuisine">{cuisine}</p>

        <div className="restaurant-card-footer">
          <span className="rating">{rating} / 5</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
