import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./CheckoutStep.css"

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
          label: <Typography>Shipping Details</Typography>,
          icon: <LocalShippingIcon />,
        },
        {
          label: <Typography>Confirm Order</Typography>,
          icon: <LibraryAddCheckIcon />,
        },
        {
          label: <Typography>Payment</Typography>,
          icon: <AccountBalanceIcon />,
        },
      ];
      /* jsx file amra component k value hisabe ue korte pari
      tai obj ba rray er value te amra component use korte pari */

      const stepStyles = {
        boxSizing: "border-box",
      };

  return (
    <>
          <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    
    </>
  )
}

export default CheckoutSteps