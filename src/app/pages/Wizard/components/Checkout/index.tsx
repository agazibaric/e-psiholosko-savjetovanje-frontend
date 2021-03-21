import { Button } from '@material-ui/core';
import React from 'react';

export interface CheckoutProps {
  handleCheckout: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ handleCheckout }) => {
  const handleOnClickCheckout = () => {
    handleCheckout();
  };
  return (
    <div>
      <Button onClick={handleOnClickCheckout}>Checkout</Button>
    </div>
  );
};

export { Checkout };
