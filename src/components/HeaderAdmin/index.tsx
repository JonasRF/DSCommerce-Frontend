import "./styles.css";
import homeIcon from '../../assets/home.svg';
import productIcon from '../../assets/products.svg';
import LoggedUser from "../LoggedUser";
import { Link, NavLink } from "react-router-dom";

export default function HeaderAdmin() {

  return (
    <header className="dsc-header-admin">
      <nav className="dsc-container">
        <Link to="/">
          <h1>Admin</h1>
        </Link>
        <div className="dsc-navbar-right">
          <div className="dsc-menu-itens-container">
            <NavLink
              to="/admin/home"
              className={({ isActive }) => isActive ? "dsc-menu-item-active" : ""}
            >
              <div className="dsc-menu-item">
                <img src={homeIcon} alt="Inicio" />
                <p>Início</p>
              </div>
            </NavLink>
            <NavLink 
            to="/admin/products"
            className={({ isActive }) => isActive ? "dsc-menu-item-active" : ""}
            >
              <div className="dsc-menu-item">
                <img src={productIcon} alt="Cadastro de produtos" /> 
              <p>Produtos</p>
              </div>
            </NavLink>
            <LoggedUser />
          </div>
        </div>
      </nav>
    </header>
  );
}
