import { Link } from "react-router-dom";
import "./styles.css";
import CartIcon from "../CartIcon";
import iconAdmin from "../../assets/Admin.svg";
import * as authService from "../../services/auth-service";
import { useContext } from "react";
import { ContextToken } from "../../utils/context-token";

export default function HeaderClient() {

  const { contextTokenPayload }  = useContext(ContextToken);

  return (
    <header className="dsc-header-client">
      <nav className="dsc-container">
        <Link to="/">
          <h1>DSCommerce</h1>
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
          <Link to="/login">
            Entrar
          </Link>
        </div>
      </nav>
    </header>
  );
}
