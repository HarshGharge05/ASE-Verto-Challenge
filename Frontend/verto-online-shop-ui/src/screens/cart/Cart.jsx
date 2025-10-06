import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import Navbar from "../../navbar/Navbar";
import api from "../../auth/api";
import { AuthContext } from "react-oauth2-code-pkce";
import { toast } from "react-toastify";
import { SearchContext } from "../../searchBar/SearchContext";

function Cart() {
  const { tokenData } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { searchQuery } = useContext(SearchContext);

  const filteredCartItems = cartItems.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery) ||
      c.description.toLowerCase().includes(searchQuery)
  );

  const fetchAllCartProducts = async () => {
    console.log("tokenData : ", tokenData);
    try {
      const response = await api.get(
        `/api/cart/getCartItems?email=${tokenData?.email}`
      );

      console.log("Cart Items : ", response.data);

      setCartItems(response.data);
    } catch (error) {
      console.log("Error ", error);
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) {
      toast.warning("⚠️ Sorry, you cannot make quantity 0");
      return;
    }

    try {
      const response = await api.put("/api/cart/updateProductQuantity", null, {
        params: {
          id,
          quantity,
        },
      });

      console.log("response ; ", response.data);

      toast.success(response.data);

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: quantity } : item
        )
      );
    } catch (error) {
      console.log("Error ", error);
    }
  };

  const handlePlaceOrder = async (
    skuCode,
    imageUrl,
    name,
    description,
    price
  ) => {
    try {
      const requestBody = {
        email: tokenData?.email,
        skuCode,
        imageUrl,
        name,
        description,
        price,
        quantity,
        userDetails: {
          email: tokenData?.email,
          firstName: tokenData?.given_name,
          lastName: tokenData?.family_name,
        },
      };

      console.log("Token Data : ", tokenData);

      console.log("requestBody : ", requestBody);

      const response = await api.post("/api/order/placeOrder", requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Placed Order response : ", response.data);
      setShowModal(false);
      toast.success(response.data);
    } catch (error) {
      toast.warning(error);
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    fetchAllCartProducts();
  }, []);

  return (
    <div>
      <Navbar />
      {cartItems.length === 0 ? (
        <div className="empty-cart-message">🛒 Your cart is empty</div>
      ) : (
        <div>
          <div className="screen-header">
            <h2>🛒 Cart</h2>
            <p>Here are the items you have added to your cart.</p>
          </div>
          <div className="cart-container">
            {filteredCartItems.map((item) => (
              <div key={item.id} className="cart-card">
                <div className="row-1">
                  <img
                    src={item.imageId}
                    alt={item.title}
                    className="cart-image"
                  />
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <p className="price">₹{item.price}</p>
                    <p className="desc">{item.description}</p>
                  </div>
                </div>
                <div className="row-2">
                  <div className="quantity-row">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="qty">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      handlePlaceOrder(
                        item.skuCode,
                        item.imageId,
                        item.name,
                        item.description,
                        item.price
                      )
                    }
                    className="buy-btn"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
