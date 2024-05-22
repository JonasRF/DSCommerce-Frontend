import "./styles.css";
import homeIcon from '../../assets/home.svg';
import productIcon from '../../assets/products.svg';

export default function HeaderAdmin() {

  return (
    <header className="dsc-header-admin">
      <nav className="dsc-container">
        <h1>Admin</h1>
        <div className="dsc-navbar-right">
          <div className="dsc-menu-itens-container">
            <div className="dsc-menu-item">
              <img src={homeIcon} alt="Inicio" />
            </div >
            <div className="dsc-menu-inicio">
              <p>Inicio</p>
            </div>

            <div className="dsc-menu-item">
              <img src={productIcon} alt="Cadastro de produtos" /> 
            </div>
            <div className="dsc-menu-inicio">
              <p>Produtos</p>
            </div>

            <div className="dsc-logger-user">
              <p>Maria Silva</p>
              <a href="#">Sair</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
