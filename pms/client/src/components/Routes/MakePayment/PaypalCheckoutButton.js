import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Navigate } from "react-router";
import http from "../../../axios-configuration";

const currency = "GBP";

const PaypalCheckoutButton = (props) => {
    const{ product } = props;
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = (orderId) =>{
        http.post(`/bookings/paid`, { bookingID: props.bookingID }).then(res => {
            if (res.data.success) {
                setPaidFor(true);
                console.log("paid")
            }
        });
    };

    console.log(paidFor)

    if (paidFor) {
        return <Navigate to={`/booking/${props.bookingID}`}/>
    }

    if(error){
        // Display error/email
        alert(error)
    }

    return(
        <PayPalButtons 
            style={{
                color: "silver",
                layout: "horizontal",
                height: 48,
                tagline: false,
                shape: "pill"
        }}

        onClick={(data, actions)=>{
            // validate on button click
            
            return actions.resolve()
        }}

        createOrder={(data, actions) => {
            return actions.order.create({
            purchase_units: [
                {
                    description: product.description,
                    amount: {
                        value: product.price
                    },
                }
            ]
        });
        }}
        
        onApprove={async (data, actions) =>{
            const order = await actions.order.capture();
            console.log("order", order)

            handleApprove(data.orderID);
        }}
        onCancel={()=>{
            // Display cancel message, email
            // Default redirect checkout page
        }}
        onError={(err) =>{
            setError(err);
            console.error("Paypal Checkout onError",err);
        }}
    />
  );  
};

export default PaypalCheckoutButton;