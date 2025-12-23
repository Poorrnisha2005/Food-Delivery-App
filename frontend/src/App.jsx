// import { useState, useEffect } from 'react'

// function App() {
//   const [restaurants, setRestaurants] = useState([])
//   const [dishes, setDishes] = useState([])
//   const [selectedRestaurant, setSelectedRestaurant] = useState(null)
//   const [cart, setCart] = useState([])
//   const [orderStatus, setOrderStatus] = useState(null)

//   useEffect(() => {
//     fetch('http://localhost:3001/api/restaurants')
//       .then(res => res.json())
//       .then(data => setRestaurants(data))
//       .catch(err => console.error(err))

//     fetch('http://localhost:3001/api/dishes')
//       .then(res => res.json())
//       .then(data => setDishes(data))
//       .catch(err => console.error(err))
//   }, [])

//   const addToCart = (dish) => {
//     setCart([...cart, dish])
//   }

//   const placeOrder = () => {
//     if (cart.length > 0) {
//       fetch('http://localhost:3001/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ items: cart })
//       })
//         .then(res => res.json())
//         .then(data => {
//           setOrderStatus('PLACED')
//           // Simulate status changes
//           setTimeout(() => setOrderStatus('PREPARING'), 2000)
//           setTimeout(() => setOrderStatus('OUT_FOR_DELIVERY'), 5000)
//           setTimeout(() => setOrderStatus('DELIVERED'), 8000)
//         })
//     }
//   }

//   return (
//     <div className="app">
//       <header className="header">
//         <h1>Food Delivery App</h1>
//       </header>
//       <main className="main">
//         {!selectedRestaurant ? (
//           <div>
//             <h2>Nearby Restaurants</h2>
//             <div className="restaurant-grid">
//               {restaurants.map(restaurant => (
//                 <div key={restaurant.id} className="restaurant-card" onClick={() => setSelectedRestaurant(restaurant)}>
//                   <img src={restaurant.image} alt={restaurant.name} />
//                   <h3>{restaurant.name}</h3>
//                   <p>Rating: {restaurant.rating} ⭐</p>
//                   <p>Delivery: {restaurant.deliveryTime}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div>
//             <button onClick={() => setSelectedRestaurant(null)} className="btn back-btn">Back to Restaurants</button>
//             <h2>{selectedRestaurant.name} Menu</h2>
//             <div className="menu-grid">
//               {dishes.map(dish => (
//                 <div key={dish.id} className="dish-card">
//                   <img src={dish.image} alt={dish.name} />
//                   <h3>{dish.name}</h3>
//                   <p className="price">${dish.price}</p>
//                   <button onClick={() => addToCart(dish)} className="btn btn-success">Add to Cart</button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//         {cart.length > 0 && (
//           <div className="cart">
//             <h3>Cart</h3>
//             {cart.map((item, index) => (
//               <p key={index}>{item.name} - ${item.price}</p>
//             ))}
//             <p><strong>Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</strong></p>
//             <button onClick={placeOrder} className="btn btn-danger">Place Order</button>
//           </div>
//         )}
//         {orderStatus && (
//           <div className="status">
//             <h3>Order Status</h3>
//             <p>{orderStatus}</p>
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }

// export default App




// import { useState, useEffect } from 'react'

// function App() {
//   const [restaurants, setRestaurants] = useState([])
//   const [dishes, setDishes] = useState([])
//   const [selectedRestaurant, setSelectedRestaurant] = useState(null)
//   const [cart, setCart] = useState([])
//   const [orderStatus, setOrderStatus] = useState(null)
//   const [showCartPage, setShowCartPage] = useState(false)
//   const [paymentDone, setPaymentDone] = useState(false)

//   useEffect(() => {
//     fetch('http://localhost:3001/api/restaurants')
//       .then(res => res.json())
//       .then(data => setRestaurants(data))

//     fetch('http://localhost:3001/api/dishes')
//       .then(res => res.json())
//       .then(data => setDishes(data))
//   }, [])

//   const addToCart = (dish) => {
//     const existing = cart.find(item => item.id === dish.id)
//     if (existing) {
//       setCart(
//         cart.map(item =>
//           item.id === dish.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       )
//     } else {
//       setCart([...cart, { ...dish, quantity: 1 }])
//     }
//   }

//   const increaseQty = (id) => {
//     setCart(cart.map(item =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     ))
//   }

//   const decreaseQty = (id) => {
//     setCart(cart.map(item =>
//       item.id === id && item.quantity > 1
//         ? { ...item, quantity: item.quantity - 1 }
//         : item
//     ))
//   }

//   const removeItem = (id) => {
//     setCart(cart.filter(item => item.id !== id))
//   }

//   const totalPrice = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   )

//   const makePayment = () => {
//     setPaymentDone(true)
//     setOrderStatus('ORDER PLACED')
//   }

//   return (
//     <div className="app">
//       <header className="header">
//         <h1>Food Delivery App</h1>
//       </header>

//       <main className="main">
//         {!showCartPage && !paymentDone && (
//           <>
//             {!selectedRestaurant ? (
//               <div>
//                 <h2>Nearby Restaurants</h2>
//                 <div className="restaurant-grid">
//                   {restaurants.map(restaurant => (
//                     <div
//                       key={restaurant.id}
//                       className="restaurant-card"
//                       onClick={() => setSelectedRestaurant(restaurant)}
//                     >
//                       <img src={restaurant.image} alt={restaurant.name} />
//                       <h3>{restaurant.name}</h3>
//                       <p>Rating: {restaurant.rating} ⭐</p>
//                       <p>Delivery: {restaurant.deliveryTime}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div>
//                 <button
//                   onClick={() => setSelectedRestaurant(null)}
//                   className="btn back-btn"
//                 >
//                   Back to Restaurants
//                 </button>

//                 <button
//                   onClick={() => setShowCartPage(true)}
//                   className="btn back-btn"
//                 >
//                   Go to Cart
//                 </button>

//                 <h2>{selectedRestaurant.name} Menu</h2>

//                 <div className="menu-grid">
//                   {dishes.map(dish => (
//                     <div key={dish.id} className="dish-card">
//                       <img src={dish.image} alt={dish.name} />
//                       <h3>{dish.name}</h3>
//                       <p className="price">${dish.price}</p>
//                       <button
//                         onClick={() => addToCart(dish)}
//                         className="btn btn-success"
//                       >
//                         Add to Cart
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </>
//         )}

//         {/* CART PAGE */}
//         {showCartPage && !paymentDone && (
//           <div className="cart">
//             <h3>Cart Page</h3>

//             {cart.map(item => (
//               <div key={item.id}>
//                 <p><strong>{item.name}</strong></p>

//                 <div>
//                   <button onClick={() => decreaseQty(item.id)}>-</button>
//                   <span> {item.quantity} </span>
//                   <button onClick={() => increaseQty(item.id)}>+</button>
//                 </div>

//                 <div>
//                   Price: ${item.price} <br />
//                   Total: ${(item.price * item.quantity).toFixed(2)}
//                 </div>

//                 <button
//                   onClick={() => removeItem(item.id)}
//                   className="btn btn-danger"
//                 >
//                   Delete
//                 </button>

//                 <hr />
//               </div>
//             ))}

//             <div>
//               <h4>Grand Total: ${totalPrice.toFixed(2)}</h4>
//             </div>

//             <button onClick={makePayment} className="btn btn-success">
//               Pay & Place Order
//             </button>
//           </div>
//         )}

//         {/* ORDER PLACED */}
//         {paymentDone && (
//           <div className="status">
//             <h3>Order Status</h3>
//             <p>{orderStatus}</p>
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }

// export default App





import { useState, useEffect } from 'react'

function App() {
  const [restaurants, setRestaurants] = useState([])
  const [dishes, setDishes] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [cart, setCart] = useState([])
  const [orderStatus, setOrderStatus] = useState(null)
  const [showCartPage, setShowCartPage] = useState(false)

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
    fetch(`${apiBase}/api/restaurants`)
      .then(res => res.json())
      .then(data => setRestaurants(data))
      .catch(err => console.error(err))

    fetch(`${apiBase}/api/dishes`)
      .then(res => res.json())
      .then(data => setDishes(data))
      .catch(err => console.error(err))
  }, [])

  const addToCart = (dish) => {
    const existingItem = cart.find(item => item.id === dish.id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === dish.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ))
    } else {
      setCart([...cart, { ...dish, quantity: 1 }])
    }
  }

  const updateQuantity = (dishId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(dishId)
    } else {
      setCart(cart.map(item => 
        item.id === dishId 
          ? { ...item, quantity: newQuantity } 
          : item
      ))
    }
  }

  const removeFromCart = (dishId) => {
    setCart(cart.filter(item => item.id !== dishId))
  }

  const placeOrder = () => {
    if (cart.length > 0) {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
      fetch(`${apiBase}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart })
      })
        .then(res => res.json())
        .then(data => {
          setOrderStatus('ORDER PLACED')
          setCart([])
          // Simulate status changes
          setTimeout(() => setOrderStatus('PREPARING'), 2000)
          setTimeout(() => setOrderStatus('OUT FOR DELIVERY'), 5000)
          setTimeout(() => setOrderStatus('DELIVERED'), 8000)
        })
    }
  }

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const CartPage = () => (
    <div className="cart-page">
      <button onClick={() => setShowCartPage(false)} className="btn back-btn">
        ← Continue Shopping
      </button>
      
      <div className="cart-header">
        <h2>Your Cart</h2>
        <p className="items-count">{cart.length} items</p>
      </div>

      <div className="cart-content">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <p>Add delicious dishes from our restaurants!</p>
            <button onClick={() => setShowCartPage(false)} className="btn">
              Browse Restaurants
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-section">
              {cart.map(item => (
                <div key={item.id} className="cart-item-card">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="item-restaurant">From: {selectedRestaurant?.name || "Restaurant"}</p>
                    <p className="item-price">₹{item.price.toFixed(2)} each</p>
                  </div>
                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        −
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                    <p className="item-total">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="btn btn-danger remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>₹{cart.length > 0 ? '49.00' : '0.00'}</span>
              </div>
              <div className="summary-row">
                <span>Taxes</span>
                <span>₹{(calculateTotal() * 0.05).toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span><strong>Total Amount</strong></span>
                <span><strong>₹{(calculateTotal() + 49 + (calculateTotal() * 0.05)).toFixed(2)}</strong></span>
              </div>
            </div>

            <div className="payment-section">
              <h3>Payment Method</h3>
              <div className="payment-options">
                <label className="payment-option">
                  <input type="radio" name="payment" defaultChecked />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>UPI</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>

            <div className="place-order-section">
              <button onClick={placeOrder} className="btn btn-success place-order-btn">
                Place Order
              </button>
              <p className="secure-payment">
                🔒 Your payment information is secure and encrypted
              </p>
            </div>
          </>
        )}
      </div>

      {orderStatus && (
        <div className="order-status-card">
          <h3>Order Status</h3>
          <div className="status-indicator">
            <div className={`status-badge ${orderStatus.replace(/\s+/g, '-').toLowerCase()}`}>
              {orderStatus}
            </div>
          </div>
          {orderStatus === 'ORDER PLACED' && (
            <p className="status-message">
              Thank you for your order! Your food is being prepared.
            </p>
          )}
        </div>
      )}
    </div>
  )

  const RestaurantPage = () => (
    <>
      <div className="page-header">
        <button onClick={() => setSelectedRestaurant(null)} className="btn back-btn">
          ← All Restaurants
        </button>
        <h2>{selectedRestaurant.name} Menu</h2>
      </div>
      
      <div className="menu-grid">
        {dishes.map(dish => (
          <div key={dish.id} className="dish-card">
            <div className="dish-image">
              <img src={dish.image} alt={dish.name} />
              <button 
                onClick={() => addToCart(dish)}
                className="add-to-cart-btn"
                title="Add to Cart"
              >
                +
              </button>
            </div>
            <div className="dish-details">
              <h3>{dish.name}</h3>
              <p className="dish-description">
                Delicious and freshly prepared with premium ingredients
              </p>
              <div className="dish-footer">
                <span className="price">₹{dish.price.toFixed(2)}</span>
                <button 
                  onClick={() => addToCart(dish)}
                  className="btn btn-success"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )

  const MainPage = () => (
    <>
      <div className="page-header">
        <h2>Featured Restaurants</h2>
        <p className="subtitle">Discover the best food in your area</p>
      </div>
      
      <div className="restaurant-grid">
        {restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card" onClick={() => setSelectedRestaurant(restaurant)}>
            <div className="restaurant-image">
              <img src={restaurant.image} alt={restaurant.name} />
              <span className="rating-badge">{restaurant.rating} ⭐</span>
            </div>
            <div className="restaurant-details">
              <h3>{restaurant.name}</h3>
              <p className="restaurant-info">
                <span className="delivery-time">🛵 {restaurant.deliveryTime}</span>
                <span className="cuisine">🍽️ North Indian, Chinese</span>
              </p>
              <div className="restaurant-footer">
                <span className="price-range">₹₹ • Moderate</span>
                <span className="status open">Open Now</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>🍽️ Foodie Express</h1>
          <nav className="header-nav">
            <button 
              onClick={() => {
                setSelectedRestaurant(null)
                setShowCartPage(false)
              }}
              className="nav-link"
            >
              Restaurants
            </button>
            <button 
              onClick={() => setShowCartPage(true)}
              className="nav-link cart-indicator"
            >
              🛒 Cart
              {cart.length > 0 && (
                <span className="cart-count">{cart.length}</span>
              )}
            </button>
          </nav>
        </div>
      </header>
      
      <main className="main">
        {showCartPage ? (
          <CartPage />
        ) : selectedRestaurant ? (
          <RestaurantPage />
        ) : (
          <MainPage />
        )}
      </main>
    </div>
  )
}

export default App