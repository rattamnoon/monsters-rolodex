import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51HoKS8EN8iNRiRYuASuXzfcPfkk62RpKKnsMMdeIP39cUMJpPqLAnvPQtAVi56Egg2zhRduYjZuEAQHgfPHdeO2300ultS6unU";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      dat: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert("Payments success");
      })
      .catch((error) => {
        console.log("Payments error: ", JSON.parse(error));
        alert(
          "There war an issue with your payment. Please sure you use the provided cerdit cart."
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
