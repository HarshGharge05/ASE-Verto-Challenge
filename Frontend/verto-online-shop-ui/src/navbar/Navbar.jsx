import React, { useContext, useState } from "react";
import { ShoppingCart, Search, Lock, User, ShoppingBag } from "lucide-react";
import "./Navbar.css";
import UserModal from "../components/UserModal";
import logo from "../assets/vertofx_logo.jpeg";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../searchBar/SearchContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setSearchQuery } = useContext(SearchContext);

  const [showUserModal, setShowUserModal] = useState(false);

  const handleOrder = () => {
    navigate("/orders");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="search-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            />
          </div>
          <div className="header-actions">
            <button className="icon-btn">
              <ShoppingBag
                onClick={() => handleOrder()}
                size={20}
                className="order-icon"
              />
            </button>
            <button className="icon-btn">
              <ShoppingCart
                onClick={() => handleCart()}
                size={20}
                className="cart-icon"
              />
            </button>
            <button
              className="icon-btn user-btn"
              onClick={() => setShowUserModal(true)}
            >
              <div className="user-avatar">
                <User size={18} />
              </div>
            </button>
          </div>
        </div>
      </header>

      <UserModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
      />
    </>
  );
};

export default Navbar;
