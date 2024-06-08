import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Route } from "react-router-dom";
import Payment from './Payment';

const PaymentRoute = () => {

    const [stripeApiKey, setStripeApiKey] =
  useState("pk_test_51OXnPZE7khtAMhy31K3PQEG9PayXPJSuS08dKnkfp5JfuHzSoVm3uIPdNrlFW1ibYanoVhqiamIlOdw7NzvzPpsb00Z55NBQFr");


  return (
    <>
     <Elements stripe={loadStripe(stripeApiKey)}>
      <Payment/>        
    </Elements>
    </>
  )
}

export default PaymentRoute