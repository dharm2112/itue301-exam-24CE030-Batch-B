import React, { useState, useEffect } from 'react';
import RestaurantCard from '../components/RestaurantCard';

const API_URL = 'http://localhost:5000';

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/restaurants`);
        const data = await response.json();

        if (response.ok && data.success) {
          setRestaurants(data.restaurants || []);
        } else {
          setError('Failed to load restaurants.');
        }
      } catch (err) {
        setError('Unable to load restaurants. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Client-side filter — no extra API call
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const term = searchTerm.toLowerCase();
    return (
      restaurant.name.toLowerCase().includes(term) ||
      restaurant.cuisine.toLowerCase().includes(term)
    );
  });

  return (
    <main className="container">
      {/* Page Header */}
      <div className="page-header">
        <h1>Explore Restaurants</h1>
        <p>Discover the best food from restaurants near you</p>
      </div>

      {/* Search Bar */}
      <div className="search-bar-wrapper">
        <input
          type="text"
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or cuisine..."
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="spinner-wrapper">
          <div className="spinner"></div>
          <span>Loading restaurants...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="alert alert-error">
          ⚠️ {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredRestaurants.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🍽️</div>
          <h3>No restaurants found</h3>
          <p>Try a different name or cuisine type.</p>
        </div>
      )}

      {/* Restaurant Cards Grid */}
      {!loading && !error && filteredRestaurants.length > 0 && (
        <div className="restaurants-grid">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              name={restaurant.name}
              cuisine={restaurant.cuisine}
              rating={restaurant.rating}
              isOpen={restaurant.isOpen}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default RestaurantsPage;
