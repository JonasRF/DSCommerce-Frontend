import "./styles.css"
import editIcon from '../../../../assets/edit.svg';
import deleteIcon from '../../../../assets/delete.svg';
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../../models/product";
import * as productService from "../../../../services/product-service";
import SearchBar from "../../../../components/SearchBar";
import ButtonNextPage from "../../../../components/ButtonNextPage";
import DialogConfirmation from "../../../../components/DialogConfirmation";
import DialogInfo from "../../../../components/DialogInfo";

type QueryParams = {
  page: number;
  name: string;
}

export default function ProductListing() {

  const [dialogInfoData, setDialogInfoData] = useState({
    visible: false,
    message: "Operação con sucesso!"
  })

  const [dialogConfirmationData, setDialogConfirmationData] = useState({
    visible: false,
    id: 0,
    message: "Tem certeza?"
  })

  const [isLastPage, setIsLastPage] = useState(false);

  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 0,
    name: ""
  });

  useEffect(() => {
    productService.findPageRequest(queryParams.page, queryParams.name)
      .then(response => {
        const nextPage = response.data.content;
        setProducts(products.concat(nextPage));
        setIsLastPage(response.data.last);
      })
  }, [queryParams]);

  const handleSearch = (searchText: string) => {
    setProducts([]);
    setQueryParams({ ...queryParams, page: 0, name: searchText });
  }

  const handleNextPageClick = () => {
    setQueryParams({ ...queryParams, page: queryParams.page + 1 });
  }

  const handleDeleteClick = (productId: number) => {
    setDialogConfirmationData({ ...dialogConfirmationData, id: productId, visible: true });
  }

  const handleDialogInfoClose = () => {
    setDialogInfoData({...dialogInfoData, visible: false});
  }

  const handleDialogConfirmationAnswer = (answer: boolean, productId: number) => {

    if (answer) {
      productService.deleteById(productId)
        .then(() => {
          setProducts([]);
          setQueryParams({ ...queryParams, page: 0 });
        })
        .catch(error => {
          setDialogInfoData({
            visible: true,
            message: error.response.data.error
          })
        });
    }

    setDialogConfirmationData({ ...dialogConfirmationData, visible: false });

  }

  return (
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

        <SearchBar onSearch={handleSearch} />

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
            {
              products.map(product => (
                <tr key={product.id} className="dsc-line-bottom">
                  <td className="dsc-tb576">{product.id}</td>
                  <td><img className="dsc-product-listing-image" src={product.imgUrl} alt={product.name} /></td>
                  <td className="dsc-tb768">R$ {product.price.toFixed(2)}</td>
                  <td className="dsc-txt-left">{product.name}</td>
                  <td><img className="dsc-product-listing-btn" src={deleteIcon} alt="Edit" /></td>
                  <td><img onClick={() => handleDeleteClick(product.id)} className="dsc-product-listing-btn" src={editIcon} alt="Delete" /></td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {
          !isLastPage &&
          <div onClick={handleNextPageClick}>
            <ButtonNextPage name="Carregar mais" />
          </div>
        }
      </section>
      {
        dialogInfoData.visible &&
        <DialogInfo
          message={dialogInfoData.message}
          onDialogClose={handleDialogInfoClose}
        />
      }
      {
        dialogConfirmationData.visible &&
        <DialogConfirmation
          id={dialogConfirmationData.id}
          message={dialogConfirmationData.message}
          onDialogAnswer={handleDialogConfirmationAnswer}
        />
      }
    </main>
  );
}