import './styles.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderDTO } from "../../../models/order";
import * as orderService from "../../../services/order-service";
import { Link } from "react-router-dom";

export default function Confirmation() {

    const params = useParams();

    const [order, setOrder] = useState<OrderDTO>();

    useEffect(() => {
        orderService.findByIdRequest(Number(params.orderId))
            .then(response => {
                setOrder(response.data);
            })
    }, []);

    return (
        <><div className="dsc-card">
            {order?.items.map((item) => (
                <div key={item.productId} className="dsc-cart-item-container dsc-line-bottom">
                    <div className="dsc-cart-item-left">
                        <img src={item.imgUrl} alt={item.name} />
                        <div className="dsc-cart-item-description">
                            <h3>{item.name}</h3>
                            <div className="dsc-cart-item-quantity-container">
                                <p>{item.quantity}</p>
                            </div>
                        </div>
                    </div>
                    <div className="dsc-cart-item-right">
                        R$ {item.subTotal.toFixed(2)}
                    </div>
                </div>
            ))}
            <div className="dsc-cart-total-container">
                <span className="dsc-cart-total">Total</span>
                <h3>R$ {order?.total.toFixed(2)}</h3>
            </div>
        </div><div className="dsc-confirmation-message">
                Pedido realizado! Número {order?.id}
            </div>
            <div className="dsc-btn-container">
                <Link to="/">
                    <div className="btn dsc-btn-white">
                        Inicio
                    </div>
                </Link>
            </div></>
    );
}