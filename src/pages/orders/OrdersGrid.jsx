import { NavLink } from "react-router";
import { OrderHeader } from "./OrderHeader";
import { OrderDetailsGrid } from "./OrderDatailsGrid";

export function OrdersGrid({ orders, loadCart }) {
  return (
    <>
      <div className="orders-grid">
        {orders.map((order) => {
          return (
            <>
              <div key={order.id} className="order-container">

                <OrderHeader  order={order} />

                <OrderDetailsGrid key={order.id}  order={order} loadCart={loadCart} />
              </div>
            </>
          );

        })}
      </div>
    </>
  );
}