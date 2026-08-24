import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const API_URL = 'http://localhost:5000';

const OrderPage = () => {
  const { token } = useContext(AuthContext);

  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch restaurants for the dropdown
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/restaurants`);
        const data = await response.json();
        if (response.ok && data.success) {
          setRestaurants(data.restaurants || []);
        }
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      }
    };
    fetchRestaurants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const totalAmount = Number(quantity) * 100;

    const orderData = {
      restaurantId: selectedRestaurant,
      items: [{ name: itemName, quantity: Number(quantity) }],
      totalAmount
    };

    try {
      const response = await fetch(`${API_URL}/api/v1/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(`Order ID: ${data.order._id}`);
        setSelectedRestaurant('');
        setItemName('');
        setQuantity(1);
        setDeliveryAddress('');
      } else {
        setError(data.message || 'Failed to create order.');
      }
    } catch (err) {
      setError('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get selected restaurant name for order summary
  const selectedRestaurantObj = restaurants.find(
    (r) => r._id === selectedRestaurant
  );

  return (
    <main className="container">
      <div className="page-header">
        <h1>🛒 Place Your Order</h1>
        <p>Fill in the details below to place your food order</p>
      </div>

      {/* Success State */}
      {success && (
        <div className="success-card" style={{ marginBottom: '1.5rem' }}>
          <span className="success-icon">✅</span>
          <h2>Order Created Successfully!</h2>
          <p>{success}</p>
        </div>
      )}

      <div className="order-layout">
        {/* Left: Order Form */}
        <div className="card">
          <h2 style={{ marginBottom: '1.5rem' }}>Order Details</h2>

          {error && <div className="alert alert-error">⚠️ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="restaurant">
                Select Restaurant
              </label>
              <select
                id="restaurant"
                className="form-control"
                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                required
              >
                <option value="">-- Choose a restaurant --</option>
                {restaurants.map((res) => (
                  <option key={res._id} value={res._id}>
                    {res.name} ({res.cuisine})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="itemName">
                Item Name
              </label>
              <input
                id="itemName"
                type="text"
                className="form-control"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="e.g. Paneer Pizza, Burger, Noodles"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="quantity">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="address">
                Delivery Address
              </label>
              <textarea
                id="address"
                className="form-control"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your full delivery address"
                required
                rows="3"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? '⏳ Placing Order...' : '🛒 Place Order'}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="order-summary">
          <h3>📋 Order Summary</h3>

          <div className="summary-row">
            <span className="summary-label">Restaurant</span>
            <span className="summary-value">
              {selectedRestaurantObj?.name || '—'}
            </span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Cuisine</span>
            <span className="summary-value">
              {selectedRestaurantObj?.cuisine || '—'}
            </span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Item</span>
            <span className="summary-value">{itemName || '—'}</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Quantity</span>
            <span className="summary-value">{quantity}</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Address</span>
            <span className="summary-value">{deliveryAddress || '—'}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span className="price">₹{Number(quantity) * 100}</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderPage;
