import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartItem } from '../cart-item/cart-item.component';

import { CartContext } from '../../context/cart.context';

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles'

import { Button } from '../button/button.component';

export const CartDropdown = () => {
  const {cartItems} = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length ? (cartItems.map(cartItem => (
            <CartItem cartItem={cartItem} key={cartItem.id} />
          ))) : (
            <EmptyMessage>Your cart is empty</EmptyMessage>
          )
        }
      </CartItems>
      <Button onClick={goToCheckoutHandler}>
        GO TO CHECKOUT
      </Button>
    </CartDropdownContainer>
  )
}
