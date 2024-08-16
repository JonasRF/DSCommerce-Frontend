import "./styles.css"
import computerIcon from '../../../../assets/computer.svg';
import editIcon from '../../../../assets/edit.svg';
import deleteIcon from '../../../../assets/delete.svg';

export default function ProductListing() {
    return(
        <main>
        <section id="product-listing-section" className="dsc-container">
          <div className="dsc-title-listing">
            <h3 >Cadastro de produtos</h3>
          </div>
          <div className="dsc-btn-container">
            <div className="btn dsc-btn-white">
              Inicio
            </div>
          </div>
          <form className="dsc-search-bar">
            <button type="submit">🔎︎</button>
            <input type="text" placeholder="Nome do produto" />
            <button type="reset">🗙</button>
          </form>
  
          <table className="dsc-table">
            <thead className="dsc-thead dsc-line-bottom">
              <tr>
              <th className="dsc-tb576">ID</th>
              <th></th>
              <th className="dsc-tb768">Preço</th>
              <th className="dsc-txt-left">Nome</th>
              <th></th>
              <th></th>
            </tr>
            </thead>
            <tbody>
              <tr className="dsc-line-bottom">
                <td className="dsc-tb576">341</td>
                <td><img className="dsc-product-listing-image" src={computerIcon} alt="Computer" /></td>
                <td className="dsc-tb768">R$ 5000,00</td>
                <td className="dsc-txt-left">Computador Gamer XT Plus Ultra</td>
                <td><img className="dsc-product-listing-btn" src={editIcon} alt="Edit" /></td>
                <td><img className="dsc-product-listing-btn" src={deleteIcon} alt="Delete" /></td>
              </tr>
              <tr className="dsc-line-bottom">
                <td className="dsc-tb576">341</td>
                <td><img className="dsc-product-listing-image" src={computerIcon} alt="Computer" /></td>
                <td className="dsc-tb768">R$ 5000,00</td>
                <td className="dsc-txt-left">Computador Gamer XT Plus Ultra</td>
                <td className="dsc-td03"><img className="dsc-product-listing-btn" src={editIcon} alt="Edit" /></td>
                <td className="dsc-td04"><img className="dsc-product-listing-btn" src={deleteIcon} alt="Delete" /></td>
              </tr>
              <tr className="dsc-line-bottom">
                <td className="dsc-tb576">341</td>
                <td className="dsc-td01"><img className="dsc-product-listing-image" src={computerIcon} alt="Computer" /></td>
                <td className="dsc-tb768">R$ 5000,00</td>
                <td className="dsc-txt-left">Computador Gamer XT Plus Ultra</td>
                <td><img className="dsc-product-listing-btn" src={editIcon} alt="Edit" /></td>
                <td><img className="dsc-product-listing-btn" src={deleteIcon} alt="Delete" /></td>
              </tr>

            </tbody>
          </table>
          
          <button className="dsc-btn-next-page">Carregar mais</button>
        </section>
      </main>
    );
}