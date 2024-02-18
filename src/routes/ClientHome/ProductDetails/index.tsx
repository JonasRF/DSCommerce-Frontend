import { useParams } from "react-router-dom";
import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ProductDetailsCard from "../../../components/ProductDetailsCard";
import * as productService from '../../../services/product-service';
import { Link } from "react-router-dom";

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
           <Link to="/">
           <ButtonInverse name="Inicio" />
           </Link>
           
          </div>
        </section>
      </main>
    );
}