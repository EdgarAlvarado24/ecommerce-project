import { Header } from "../components/Header";
import { NavLink} from "react-router";
import { useParams } from "react-router";
import './TrackingPage.css'
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export function TrackingPage({ cart }) {
  const [order, setOrder] = useState(null)
  const { orderId, productId } = useParams();



  useEffect(() => {
    const getTrackingPageData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`)
      setOrder(response.data)
    }

    getTrackingPageData()
  }, [orderId])


  if (!order) {
    return null;
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });


  let totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  let timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryProgressPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  let deliveryPercent = deliveryProgressPercent >= 100 ? 100 : deliveryProgressPercent
  let isPreparing;
  let isShipped;
  let isDelivered;
  if (deliveryPercent < 33){
    isPreparing = deliveryPercent;
  }else if (deliveryPercent >= 33 && deliveryPercent < 100){
    isShipped = deliveryPercent;
  }else if (deliveryPercent === 100){
    isDelivered = deliveryPercent;
  }

  return (
    <>
      <Header cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <NavLink className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </NavLink>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? 'Delivered on' : 'Arriving on'} {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            {orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
             <div className={`progress-label ${isPreparing && 'current-status'}`}>
               Preparing
             </div>
             <div className={`progress-label ${isShipped && 'current-status'}`}>
               Shipped
             </div>
             <div className={`progress-label ${isDelivered && 'current-status'}`}>
               Delivered
             </div>
           </div>

           <div className="progress-bar-container">
            <div className="progress-bar" style={{width:`${deliveryPercent}%`}}></div>
           </div>
        </div>
      </div>
    </>
  )
}