import React, { useContext, useEffect, useState } from "react";
import "./Order.css";
import Navbar from "../../navbar/Navbar";
import api from "../../auth/api";
import { AuthContext } from "react-oauth2-code-pkce";
import { SearchContext } from "../../searchBar/SearchContext";

function Order() {
  const [orders, setOrders] = useState([]);
  const { searchQuery } = useContext(SearchContext);

  const { tokenData } = useContext(AuthContext);

  const filteredOrders = orders.filter(
    (o) =>
      o.name.toLowerCase().includes(searchQuery) ||
      o.description.toLowerCase().includes(searchQuery)
  );

  const fetchAllOrders = async () => {
    try {
      const response = await api.get(
        `/api/order/getAllOrders?email=${tokenData?.email}`
      );

      console.log("Fetched Orders : ", response.data);

      setOrders(response.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleTrackNow = () => {
    alert("Not implemented yet.");
  };

  return (
    <div>
      {orders.length === 0 ? (
        <div className="empty-order-message">📦 No Orders found</div>
      ) : (
        <>
          <div className="screen-header">
            <h2>📦 Your Orders</h2>
            <p>Track your recent orders and their status here.</p>
          </div>

          <div className="orders-container">
            {filteredOrders.map((order) => (
              <div key={order.id} className="order-card">
                <img
                  src={order.imageUrl}
                  alt={order.title}
                  className="order-image"
                />

                <div className="order-details">
                  <h3>{order.name}</h3>
                  <p className="price">₹{order.price}</p>
                  <p className="desc">{order.description}</p>
                </div>

                <button onClick={() => handleTrackNow()} className="track-btn">
                  Track Now
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Order;
