const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let orders = [];

app.get('/api/restaurant/orders', (req, res) => {
  res.json(orders);
});

app.put('/api/restaurant/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  // Simulate updating status
  console.log(`Order ${id} status updated to ${status}`);
  res.json({ message: 'Status updated' });
});

app.post('/api/delivery/assign', (req, res) => {
  // Simulate delivery assignment
  res.json({ message: 'Delivery assigned' });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Flask-alternative server running on port ${PORT}`);
});