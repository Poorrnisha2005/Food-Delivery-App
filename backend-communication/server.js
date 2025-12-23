const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to forward order from Express to Flask
app.post('/api/communicate/order', async (req, res) => {
  try {
    const orderData = req.body;
    // Forward to Flask server
    const flaskUrl = process.env.FLASK_URL || 'http://localhost:3002';
    const response = await axios.post(`${flaskUrl}/api/restaurant/orders`, orderData);
    res.json({ message: 'Order communicated to restaurant service', data: response.data });
  } catch (error) {
    console.error('Error communicating with Flask:', error.message);
    res.status(500).json({ error: 'Failed to communicate with restaurant service' });
  }
});

// Endpoint to update order status from Flask to Express or frontend
app.post('/api/communicate/status', async (req, res) => {
  try {
    const { orderId, status } = req.body;
    // In real app, notify Express or use WebSocket to frontend
    console.log(`Order ${orderId} status updated to ${status}`);
    res.json({ message: 'Status update communicated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Endpoint for delivery assignment
app.post('/api/communicate/delivery', async (req, res) => {
  try {
    const deliveryData = req.body;
    const flaskUrl = process.env.FLASK_URL || 'http://localhost:3002';
    const response = await axios.post(`${flaskUrl}/api/delivery/assign`, deliveryData);
    res.json({ message: 'Delivery assigned', data: response.data });
  } catch (error) {
    console.error('Error communicating with delivery service:', error.message);
    res.status(500).json({ error: 'Failed to assign delivery' });
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Communication server running on port ${PORT}`);
});