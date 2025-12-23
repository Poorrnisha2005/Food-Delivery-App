from flask import Flask, jsonify, request
from flask_cors import CORS
import requests  # For HTTP calls

app = Flask(__name__)
CORS(app)

# Mock data for restaurants and orders
restaurants = [
    {"id": 1, "name": "Pizza Palace", "status": "open"},
    # Add more
]

orders = []

@app.route('/api/restaurant/orders', methods=['GET'])
def get_orders():
    return jsonify(orders)

@app.route('/api/restaurant/orders/<int:order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    data = request.json
    status = data.get('status')
    # Update order status
    for order in orders:
        if order['id'] == order_id:
            order['status'] = status
            break
    # Communicate status update via communication server
    try:
        requests.post('http://localhost:3003/api/communicate/status', json={'orderId': order_id, 'status': status})
    except:
        pass  # Ignore if communication server is down
    return jsonify({"message": "Status updated"})

@app.route('/api/delivery/assign', methods=['POST'])
def assign_delivery():
    # Mock assign delivery
    return jsonify({"message": "Delivery assigned"})

if __name__ == '__main__':
    app.run(port=3002, debug=True)