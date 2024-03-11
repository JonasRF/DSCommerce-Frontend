import { useEffect, useState } from 'react';
import ButtonNextPage from '../../../components/ButtonNextPage';
import CatalogCard from '../../../components/CatalogCard';
import SearchBar from '../../../components/SearchBar';
import * as productService from '../../../services/product-service';
import './styles.css';
import { ProductDTO } from '../../../models/product';

type QueryParams = {
  page: number;
  name: string;
}

export default function Catalog() {

    const [ products, setProducts ] = useState<ProductDTO[]>([]);

    const [queryParams, setQueryParams] = useState<QueryParams>({
      page: 0,
      name: ""
    });

    useEffect(() => {
      productService.findPageRequest(queryParams.page, queryParams.name)
      .then(response => {
        setProducts(response.data.content);
      })
    }, [queryParams]);

    const handleSearch = (searchText: string) => {
       setQueryParams({...queryParams, name: searchText});
    }

    return(
        <main>
        <section id="catalog-section" className="dsc-container">
         <SearchBar onSearch={handleSearch} />
          <div className="dsc-catalog-cards">
          {
            products.map(product => <CatalogCard key={product.id} product={product} /> )
          }
          </div>
          <ButtonNextPage name="Carregar mais" />
        </section>
      </main>
    );
}