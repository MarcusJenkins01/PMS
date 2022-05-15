import PaypalCheckoutButton from "./PaypalCheckoutButton";
import calcPay from "./calcPay";

const Checkout = (props) => {
  console.log(calcPay(props.checkInDate, props.checkOutDate));

  const product = {
      description: "Parking Spot for x hours",
      price: 10
  }
  
  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <p className="checkout-title">UEA PMS Reservation Payment</p>
      <p className="checkout-description">
        --
      </p>
      <h1 className="checkout-price">price</h1>
    
      <div className="separator"></div>
      <div className="paypal">
        <div className="paypal-button-container">
            <PaypalCheckoutButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
