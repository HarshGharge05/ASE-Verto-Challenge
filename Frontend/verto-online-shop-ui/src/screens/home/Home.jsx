import React, { useContext } from "react";
import "./Home.css";
import { TypeAnimation } from "react-type-animation";
import girlImage from "../../assets/girl_image.png";
import { AuthContext } from "react-oauth2-code-pkce";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const { token, tokenData, logIn, logOut, isAuthenticated } =
    useContext(AuthContext);

  const checkAuthentication = () => {
    console.log("checkAuthentication() is called");
    console.log("Token : ", token);

    if (!token) {
      logIn();
    } else {
      navigate("/product");
    }
  };

  return (
    <div className="container">
      <div className="main">
        <div className="text-section">
          <TypeAnimation
            sequence={[
              "Welcome, to the",
              500,
              () => {
                const el = document.getElementById("shop-title");
                if (el) el.style.opacity = 1;
              },
            ]}
            speed={30}
            wrapper="h2"
            cursor={false}
            repeat={0}
            className="typing-h2"
          />
          <h1
            id="shop-title"
            className="typing-h1"
            style={{ opacity: 0, transition: "opacity 0.5s" }}
          >
            <span className="verto-gradient">Verto's</span> Online shop
          </h1>
          <h1 className="heading">
            Shop the <span className="highlight">Latest Trends</span>, Delivered
            to Your Door
          </h1>
          <p className="paragraph">
            Discover handpicked collections of fashion, lifestyle, and
            essentials. Affordable prices. Fast delivery. Easy returns.
          </p>
          <button className="button" onClick={() => checkAuthentication()}>
            Shop Now
          </button>
        </div>

        <div className="image-section">
          <img src={girlImage} alt="Shopping" />
        </div>
      </div>
    </div>
  );
}

export default Home;
