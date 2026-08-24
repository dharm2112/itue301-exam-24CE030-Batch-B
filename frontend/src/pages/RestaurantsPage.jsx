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
        setError('Failed to load restaurants.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const term = searchTerm.toLowerCase();
    const matchesName = restaurant.name.toLowerCase().includes(term);
    const matchesCuisine = restaurant.cuisine.toLowerCase().includes(term);
    return matchesName || matchesCuisine;
  });

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <h1>Restaurants</h1>

      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search restaurants..."
          style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', boxSizing: 'border-box' }}
        />
      </div>

      {loading && <p>Loading restaurants...</p>}

      {error && !loading && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && filteredRestaurants.length === 0 && (
        <p>No restaurants found.</p>
      )}

      {!loading && !error && filteredRestaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant._id}
          name={restaurant.name}
          cuisine={restaurant.cuisine}
          rating={restaurant.rating}
          isOpen={restaurant.isOpen}
        />
      ))}
    </div>
  );
};

export default RestaurantsPage;
