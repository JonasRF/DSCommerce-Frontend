import ButtonNextPage from '../../../components/ButtonNextPage';
import CatalogCard from '../../../components/CatalogCard';
import SearchBar from '../../../components/SearchBar';
import * as productService from '../../../services/product-service';
import './styles.css';

export default function Catalog() {
    return(
        <main>
        <section id="catalog-section" className="dsc-container">
         <SearchBar />
          <div className="dsc-catalog-cards">
          {
            productService.findAll().map(product => <CatalogCard key={product.id} product={product} /> )
          }
          </div>
          <ButtonNextPage name="Carregar mais" />
        </section>
      </main>
    );
}