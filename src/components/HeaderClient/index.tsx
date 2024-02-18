import { Link } from "react-router-dom";
import cartImg from "../../assets/cart.svg";
import "./styles.css";

export default function HeaderClient() {
  return (
    <header className="dsc-header-client">
      <nav className="dsc-container">
        <Link to="/">
          <h1>DSCommerce</h1>
        </Link>
        <div className="dsc-navbar-right">
          <div className="dsc-menu-item">
            <Link to="/cart">
            <img src={cartImg} alt="Carrinho de compras" />
            </Link>           
          </div>
          <Link to="/login">
            Entrar
          </Link>
        </div>
      </nav>
    </header>
  );
}
