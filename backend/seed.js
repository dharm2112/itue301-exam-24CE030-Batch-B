const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Customer = require('./models/Customer');
const Restaurant = require('./models/Restaurant');
const Order = require('./models/Order');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');
    console.log('========================================');

    // ===== CUSTOMERS (10 entries) =====
    const customers = [
      { name: 'Alex Patel',     email: 'alex@example.com',   phone: '9876543210', address: 'Surat, Gujarat' },
      { name: 'Rahul Shah',     email: 'rahul@example.com',  phone: '9876543211', address: 'Ahmedabad, Gujarat' },
      { name: 'Priya Mehta',    email: 'priya@example.com',  phone: '9876543212', address: 'Vadodara, Gujarat' },
      { name: 'Aman Joshi',     email: 'aman@example.com',   phone: '9876543213', address: 'Mumbai, Maharashtra' },
      { name: 'Sneha Gupta',    email: 'sneha@example.com',  phone: '9876543214', address: 'Pune, Maharashtra' },
      { name: 'Karan Verma',    email: 'karan@example.com',  phone: '9876543215', address: 'Delhi, Delhi' },
      { name: 'Nisha Desai',    email: 'nisha@example.com',  phone: '9876543216', address: 'Rajkot, Gujarat' },
      { name: 'Vivek Kumar',    email: 'vivek@example.com',  phone: '9876543217', address: 'Jaipur, Rajasthan' },
      { name: 'Anjali Singh',   email: 'anjali@example.com', phone: '9876543218', address: 'Indore, MP' },
      { name: 'Rohit Sharma',   email: 'rohit@example.com',  phone: '9876543219', address: 'Bengaluru, Karnataka' }
    ];

    console.log('\nSeeding Customers...');
    const savedCustomers = [];
    for (const cData of customers) {
      let c = await Customer.findOne({ email: cData.email });
      if (!c) {
        c = await Customer.create(cData);
        console.log('  [NEW]      Customer:', c.name, '|', c.email);
      } else {
        console.log('  [EXISTS]   Customer:', c.name, '|', c.email);
      }
      savedCustomers.push(c);
    }

    // ===== RESTAURANTS (10 entries) =====
    const restaurants = [
      { name: 'Spice Garden',      cuisine: 'Indian',       rating: 4.5, isOpen: true  },
      { name: 'Pizza Corner',      cuisine: 'Italian',      rating: 4.2, isOpen: true  },
      { name: 'Burger House',      cuisine: 'Fast Food',    rating: 4.0, isOpen: false },
      { name: 'Green Bowl',        cuisine: 'Healthy',      rating: 4.7, isOpen: true  },
      { name: 'Dragon Palace',     cuisine: 'Chinese',      rating: 4.3, isOpen: true  },
      { name: 'Taco Town',         cuisine: 'Mexican',      rating: 4.1, isOpen: true  },
      { name: 'Sushi World',       cuisine: 'Japanese',     rating: 4.6, isOpen: false },
      { name: 'The Grill Spot',    cuisine: 'BBQ',          rating: 4.4, isOpen: true  },
      { name: 'Curry House',       cuisine: 'Indian',       rating: 4.8, isOpen: true  },
      { name: 'Pasta Republic',    cuisine: 'Italian',      rating: 3.9, isOpen: true  }
    ];

    console.log('\nSeeding Restaurants...');
    const savedRestaurants = [];
    for (const rData of restaurants) {
      let r = await Restaurant.findOne({ name: rData.name });
      if (!r) {
        r = await Restaurant.create(rData);
        console.log('  [NEW]      Restaurant:', r.name, '|', r.cuisine, '| Open:', r.isOpen);
      } else {
        console.log('  [EXISTS]   Restaurant:', r.name, '|', r.cuisine, '| Open:', r.isOpen);
      }
      savedRestaurants.push(r);
    }

    // ===== ORDERS (10 entries) =====
    const orderTemplates = [
      { customerIndex: 0, restaurantIndex: 0, items: [{ name: 'Paneer Butter Masala', quantity: 2 }, { name: 'Naan', quantity: 4 }],           totalAmount: 450 },
      { customerIndex: 1, restaurantIndex: 1, items: [{ name: 'Margherita Pizza', quantity: 1 }, { name: 'Garlic Bread', quantity: 2 }],        totalAmount: 380 },
      { customerIndex: 2, restaurantIndex: 3, items: [{ name: 'Quinoa Salad', quantity: 1 }, { name: 'Green Smoothie', quantity: 2 }],          totalAmount: 290 },
      { customerIndex: 3, restaurantIndex: 4, items: [{ name: 'Hakka Noodles', quantity: 2 }, { name: 'Manchurian', quantity: 1 }],             totalAmount: 320 },
      { customerIndex: 4, restaurantIndex: 5, items: [{ name: 'Taco Platter', quantity: 3 }],                                                   totalAmount: 270 },
      { customerIndex: 5, restaurantIndex: 7, items: [{ name: 'BBQ Chicken', quantity: 1 }, { name: 'Coleslaw', quantity: 2 }],                 totalAmount: 550 },
      { customerIndex: 6, restaurantIndex: 8, items: [{ name: 'Butter Chicken', quantity: 2 }, { name: 'Rumali Roti', quantity: 6 }],           totalAmount: 480 },
      { customerIndex: 7, restaurantIndex: 9, items: [{ name: 'Penne Arrabbiata', quantity: 2 }],                                              totalAmount: 340 },
      { customerIndex: 0, restaurantIndex: 1, items: [{ name: 'Pepperoni Pizza', quantity: 1 }, { name: 'Coke', quantity: 2 }],                 totalAmount: 420 },
      { customerIndex: 1, restaurantIndex: 8, items: [{ name: 'Dal Makhani', quantity: 1 }, { name: 'Tandoori Roti', quantity: 4 }],           totalAmount: 310 }
    ];

    console.log('\nSeeding Orders...');
    let orderCount = 0;
    for (let i = 0; i < orderTemplates.length; i++) {
      const t = orderTemplates[i];
      const customer = savedCustomers[t.customerIndex];
      const restaurant = savedRestaurants[t.restaurantIndex];

      // Check if order already exists for this customer+restaurant combo
      const existing = await Order.findOne({
        customerId: customer._id,
        restaurantId: restaurant._id,
        totalAmount: t.totalAmount
      });

      if (!existing) {
        const order = await Order.create({
          customerId: customer._id,
          restaurantId: restaurant._id,
          items: t.items,
          totalAmount: t.totalAmount,
          status: 'pending'
        });
        console.log(`  [NEW]      Order #${i + 1}: ${customer.name} → ${restaurant.name} | ₹${t.totalAmount} | status: pending`);
        orderCount++;
      } else {
        console.log(`  [EXISTS]   Order #${i + 1}: ${customer.name} → ${restaurant.name} | ₹${t.totalAmount}`);
      }
    }

    // ===== FINAL SUMMARY =====
    const totalCustomers = await Customer.countDocuments();
    const totalRestaurants = await Restaurant.countDocuments();
    const totalOrders = await Order.countDocuments();

    console.log('\n========================================');
    console.log('Seeding Completed Successfully!');
    console.log('========================================');
    console.log('Total Customers  in DB:', totalCustomers);
    console.log('Total Restaurants in DB:', totalRestaurants);
    console.log('Total Orders      in DB:', totalOrders);
    console.log('========================================');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error.message);
    process.exit(1);
  }
};

seedData();
