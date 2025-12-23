const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const restaurants = [
  { id: 1, name: 'Pizza Palace', image: 'https://picsum.photos/300/200?random=1', rating: 4.5, deliveryTime: '25-30 min' },
  { id: 2, name: 'Burger Barn', image: 'https://picsum.photos/300/200?random=2', rating: 4.2, deliveryTime: '20-25 min' },
  { id: 3, name: 'Sushi Spot', image: 'https://picsum.photos/300/200?random=3', rating: 4.7, deliveryTime: '30-35 min' },
  { id: 4, name: 'Taco Town', image: 'https://picsum.photos/300/200?random=4', rating: 4.3, deliveryTime: '15-20 min' },
  { id: 5, name: 'Pasta Place', image: 'https://picsum.photos/300/200?random=5', rating: 4.6, deliveryTime: '25-30 min' },
  { id: 6, name: 'Chicken Corner', image: 'https://picsum.photos/300/200?random=6', rating: 4.1, deliveryTime: '20-25 min' },
  { id: 7, name: 'Veggie Villa', image: 'https://picsum.photos/300/200?random=7', rating: 4.4, deliveryTime: '30-35 min' },
  { id: 8, name: 'Seafood Shack', image: 'https://picsum.photos/300/200?random=8', rating: 4.8, deliveryTime: '35-40 min' },
  { id: 9, name: 'Dessert Den', image: 'https://picsum.photos/300/200?random=9', rating: 4.5, deliveryTime: '15-20 min' },
  { id: 10, name: 'Coffee Cafe', image: 'https://picsum.photos/300/200?random=10', rating: 4.2, deliveryTime: '10-15 min' },
]

const dishes = [
  { id: 1, name: 'Margherita Pizza', price: 12.99, image: 'https://picsum.photos/200/150?random=11' },
  { id: 2, name: 'Cheeseburger', price: 9.99, image: 'https://picsum.photos/200/150?random=12' },
  { id: 3, name: 'California Roll', price: 15.99, image: 'https://picsum.photos/200/150?random=13' },
  { id: 4, name: 'Beef Taco', price: 8.99, image: 'https://picsum.photos/200/150?random=14' },
  { id: 5, name: 'Spaghetti Carbonara', price: 14.99, image: 'https://picsum.photos/200/150?random=15' },
  { id: 6, name: 'Fried Chicken', price: 10.99, image: 'https://picsum.photos/200/150?random=16' },
  { id: 7, name: 'Veggie Stir Fry', price: 11.99, image: 'https://picsum.photos/200/150?random=17' },
  { id: 8, name: 'Grilled Salmon', price: 18.99, image: 'https://picsum.photos/200/150?random=18' },
  { id: 9, name: 'Chocolate Cake', price: 6.99, image: 'https://picsum.photos/200/150?random=19' },
  { id: 10, name: 'Cappuccino', price: 4.99, image: 'https://picsum.photos/200/150?random=20' },
  { id: 11, name: 'Pepperoni Pizza', price: 14.99, image: 'https://picsum.photos/200/150?random=21' },
  { id: 12, name: 'Veggie Burger', price: 10.99, image: 'https://picsum.photos/200/150?random=22' },
  { id: 13, name: 'Tempura Shrimp', price: 16.99, image: 'https://picsum.photos/200/150?random=23' },
  { id: 14, name: 'Carnitas Burrito', price: 12.99, image: 'https://picsum.photos/200/150?random=24' },
  { id: 15, name: 'Lasagna', price: 13.99, image: 'https://picsum.photos/200/150?random=25' },
]

app.get('/api/restaurants', (req, res) => {
  res.json(restaurants);
});

app.get('/api/dishes', (req, res) => {
  res.json(dishes);
});

app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    // Communicate with restaurant service via communication server
    const communicationUrl = process.env.COMMUNICATION_URL || 'http://localhost:3003';
    const response = await axios.post(`${communicationUrl}/api/communicate/order`, orderData);
    res.json({ message: 'Order placed and communicated', orderId: Date.now(), data: response.data });
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});