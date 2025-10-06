import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import "./Product.css";
import ProductCard from "./ProductCard";
import Navbar from "../../navbar/Navbar";
import api from "../../auth/api";
import { SearchContext } from "../../searchBar/SearchContext";

function Product() {
  const [showUserModal, setShowUserModal] = useState(false);
  const [products, setProducts] = useState([]);
  const { token, refreshToken } = useContext(AuthContext);
  const { searchQuery } = useContext(SearchContext);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery)
  );

  const fetchAllProducts = async () => {
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("refreshToken", refreshToken);

    try {
      const response = await api.get("/api/product/getProducts");
      console.log("Fetched Products : ", response.data);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="product-page">
      <main className="main-content">
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              skuCode={product.skuCode}
              image={product.image}
              title={product.name}
              price={product.price}
              description={product.description}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Product;
