import { useEffect, useState } from "react";
import { orderListDTO } from "../../models/order";
import * as orderService from "../../services/order-service";
import "./styles.css";

export default function ListOrder() {

  const [orderList, setOrder] = useState<orderListDTO[]>([]);

  useEffect(() => {
    orderService.findOrderByUserRequest()
      .then(response => {
        setOrder(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const getStatusName = (status: number) => {
    const statusMap: { [key: number]: string } = {
      0: 'WAITING_PAYMENT',
      1: 'SHIPPED',
      2: 'PAID',
      3: 'DELIVERED',
      4: 'CANCELED',
    };
    return statusMap[status] || 'Desconhecido';
  };

  const groupedOrders = orderList.reduce((acc: { [key: number]: any }, order) => {
    if (!acc[order.id]) {
      acc[order.id] = { ...order, items: [], totalQuantity: 0, totalPrice: 0 };
    }
    acc[order.id].items.push(order);
    acc[order.id].totalQuantity += order.quantity;
    acc[order.id].totalPrice += order.price * order.quantity;
    return acc;
  }, {});

  const groupedOrderList = Object.values(groupedOrders);

  return (
    <>
      <div className="dsc_list_header">
        <h1>PEDIDOS REALIZADOS: </h1>
      <div className="order-list-container">
        {groupedOrderList.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <h2>Pedido: {order.id}</h2>
            </div>
            <div className="order-card-body">
              <p>QuantityItens: {order.totalQuantity}</p>
              <p>Status: {getStatusName(order.status)}</p>
              <div className="dsc-order-items">
                {order.items.map((item: any) => (
                  <div key={item.itemId} className="order-item">
                    <img src={item.img_url} alt="Imagem do produto" />
                    <p>Name: {item.productName}</p>
                    <p>Price: R$ {item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>                  
                ))}
                <h4>Valor Total: R$ {order.totalPrice.toFixed(2)}</h4>
              </div>
             
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}