import { useParams } from "react-router-dom";
import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ProductDetailsCard from "../../../components/ProductDetailsCard";
import * as productService from '../../../services/product-service';

export default function ProductDetails() {

  const params = useParams();

  const product = productService.findById(Number(params.productId));

    return(
      <main>
        <section id="product-details-section" className="dsc-container">
          {
            product && //Renderização condicional
            <ProductDetailsCard product={product} />
          }
          
          <div className="dsc-btn-container">
           <ButtonPrimary name="Comprar" />
           <ButtonInverse name="Carregar mais" />
          </div>
        </section>
      </main>
    );
}