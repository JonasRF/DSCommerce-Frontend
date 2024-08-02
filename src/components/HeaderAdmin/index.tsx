import "./styles.css";
import homeIcon from '../../assets/home.svg';
import productIcon from '../../assets/products.svg';
import LoggedUser from "../LoggedUser";
import { NavLink } from "react-router-dom";

export default function HeaderAdmin() {

  return (
    <header className="dsc-header-admin">
      <nav className="dsc-container">
        <h1>Admin</h1>
        <div className="dsc-navbar-right">
          <div className="dsc-menu-itens-container">
          <NavLink  className="dsc-menu-inicio" to="/admin/home">
            <div className="dsc-menu-item">
              <img src={homeIcon} alt="Inicio" />
            </div >
            <div className="dsc-menu-inicio">
              <p>Inicio</p>
            </div>
            </NavLink>
            <NavLink  className="dsc-menu-inicio" to="/admin/products">
            <div className="dsc-menu-item">
              <img src={productIcon} alt="Cadastro de produtos" /> 
            </div>
            <div className="dsc-menu-inicio">
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
