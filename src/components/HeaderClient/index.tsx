import { Link } from "react-router-dom";
import "./styles.css";
import CartIcon from "../CartIcon";
import iconAdmin from "../../assets/Admin.svg";
import iconListOrder from "../../assets/755802.png"
import * as authService from "../../services/auth-service";
import { useContext } from "react";
import { ContextToken } from "../../utils/context-token";
import LoggedUser from "../LoggedUser";

export default function HeaderClient() {

  const { contextTokenPayload }  = useContext(ContextToken);

  return (
    <header className="dsc-header-client">
      <nav className="dsc-container">
        <Link to="/">
          <h1>DSCommerce</h1>
        </Link>
        <Link to="/list-orders">
        <div className="dsc-List-orders">
          <img  src={iconListOrder} alt="icone de carrinho de compras" />
        </div>
        </Link>
        <div className="dsc-navbar-right">
          {
            contextTokenPayload &&
            authService.hasAnyHoles(["ROLE_ADMIN"]) &&
            <Link to="/admin">
              <div className="dsc-menu-item">
                <img src={iconAdmin} alt="admin" />
              </div>
            </Link>
          }
          <Link to="/cart">
            <div className="dsc-menu-item">
              <CartIcon />
            </div>
          </Link>
          <LoggedUser />
        </div>
      </nav>
    </header>
  );
}
