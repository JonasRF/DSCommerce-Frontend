import { useParams } from "react-router-dom";
import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ProductDetailsCard from "../../../components/ProductDetailsCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDTO } from "../../../models/product";
import axios from "axios";

export default function ProductDetails() {

  const params = useParams();

  const [ product, setProduct ] = useState<ProductDTO>();

  useEffect(() => {
    axios.get("http://localhost:8080/products/1")
    .then(response => {
      console.log(response.data);
      setProduct(response.data);
    });
   
  },[]);

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