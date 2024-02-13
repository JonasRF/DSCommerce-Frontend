import ButtonNextPage from '../../../components/ButtonNextPage';
import CatalogCard from '../../../components/CatalogCard';
import HeaderClient from '../../../components/HeaderClient';
import SearchBar from '../../../components/SearchBar';
import { ProductDTO } from '../../../models/product';
import './styles.css';

const product: ProductDTO = {
  id: 2,
  name: "Smart TV",
  description: "dsdhshrhhrhrdhdrhrhrh",
  imgUrl: "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg",
  price: 2500.80,
  categories: [
    {
    id: 2,
    name: "Eletronicos"
    },
    {
      id: 3,
      name: "Computadores"
      },
      {
        id: 4,
        name: "Importados"
        }
  ]
}

export default function Catalog() {
    return(
        <main>
        <section id="catalog-section" className="dsc-container">
         <SearchBar />
          <div className="dsc-catalog-cards">
          <CatalogCard product={product} />
          <CatalogCard product={product} />
          <CatalogCard product={product}/>
          <CatalogCard product={product}/>
          <CatalogCard product={product}/>
          <CatalogCard product={product}/>
          <CatalogCard product={product}/>
          <CatalogCard product={product}/>
          <CatalogCard product={product}/>
          <CatalogCard product={product}/>
          </div>
          <ButtonNextPage name="Carregar mais" />
        </section>
      </main>
    );
}