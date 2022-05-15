import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PaypalCheckoutButton = (props) => {
    const{ product } = props;

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);

    const handleApprove = (orderId) =>{
        // request to backend to fufill order 
        // if response success 
        setPaidFor(true);
        // refresh user account 
        //if response error, alert user
        // setError("YOUR PAYment was processed successfully but didnt work please contact support at @support.uea.ac.uk")
        

    };

    if(paidFor){
        // Display success message/email
        alert("Thank you for your purchase, your spot have been reserved");
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
            const alreadyReserved = false
            if (alreadyReserved){
                setError("You have already reserved a spot, check your current reserved spots or contact support");
                return actions.reject()
            }else{
                return actions.resolve()
            }
        }}

        createOrder={(data, actions) => {
            return actions.order.create({
            purchase_units: [
                {
                    description: product.description,
                    amount: {
                        value: product.price
                    }
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