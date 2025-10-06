import React, { useContext, useState } from "react";
import { ShoppingCart, Star } from "lucide-react";
import "./ProductCard.css";
import { AuthContext } from "react-oauth2-code-pkce";
import api from "../../auth/api";
import { toast } from "react-toastify";

const ProductCard = ({
  productId,
  skuCode,
  image,
  title,
  price,
  description,
}) => {
  const { tokenData } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    const formData = new FormData();
    formData.append("email", tokenData?.email);
    formData.append("productId", productId);
    formData.append("skuCode", skuCode);
    formData.append("name", title);
    formData.append("imageId", image);
    formData.append("description", description);
    formData.append("price", price);

    try {
      const response = await api.post("/api/cart/addProductToCart", formData);

      console.log("Product Added to cart : ", response.data);

      setMessage(response.data.message || "Product added successfully");
      setShowMessage(true);

      setTimeout(() => setShowMessage(false), 3000);
    } catch (error) {
      console.log("Error while adding product in the Cart", error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const requestBody = {
        email: tokenData?.email,
        skuCode,
        imageUrl: image,
        name: title,
        description: description,
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

  return (
    <>
      <div className="product-card">
        <div className="product-image-container">
          <img src={image} alt={title} className="product-image" />
          <button onClick={() => handleAddToCart()} className="cart-icon-btn">
            <ShoppingCart size={18} />
          </button>
        </div>

        <div className="product-info">
          <div className="product-header">
            <h3 className="product-title">{title}</h3>
          </div>

          <div className="price-row">
            <span className="product-price">₹ {price}</span>
          </div>

          <p className="product-description">{description}</p>

          <button onClick={() => setShowModal(true)} className="shop-now-btn">
            Buy Now
          </button>

          {showMessage && (
            <div
              className="cart-message"
              style={{ backgroundColor: "#4caf50" }}
            >
              {message}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <button className="close-icon" onClick={() => setShowModal(false)}>
              ✕
            </button>

            <img src={image} alt={title} className="modal-image" />
            <h2>{title}</h2>
            <p>Price: ₹ {price}</p>

            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <button
              className="place-order-btn"
              onClick={() => handlePlaceOrder()}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
