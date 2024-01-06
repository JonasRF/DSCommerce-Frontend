import  computerImg  from '../../assets/computer.svg';
import ProductCategory from '../ProductCategory';
import './styles.css';

export default function ProductDetailsCard() {
  return (
    <div className="dsc-card dsc-mb20">
      <div className="dsc-product-details-top dsc-line-bottom">
        <img src={computerImg} alt="computador" />
      </div>
      <div className="dsc-product-details-bottom">
        <h3>R$ 5000,00</h3>
        <h4>Computador Gamer XT</h4>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard d ummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <div className="dsc-category-container">
          <ProductCategory />
          <ProductCategory />
        </div>
      </div>
    </div>
  );
}
