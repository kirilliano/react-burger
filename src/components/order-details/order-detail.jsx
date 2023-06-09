import styleDetails from '../order-details/order-detail.module.css';
import { useSelector } from 'react-redux';

function OrderDetails() {
  const orderNumber = useSelector((state) => state.order.orderNumber);

  return (
    <div className={styleDetails.container}>
      <h2 className={'text text_type_digits-large' + ' ' + styleDetails.number}>{orderNumber}</h2>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <div className={styleDetails.image}></div>
      <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
