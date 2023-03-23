import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import {
  CartIconContainer,
  ShoppingIcon,
  IconCount
} from './chart-icon.styles'

export const CartIcon = () => {
  const { isCartOpen,setIsCartOpen } = useContext(CartContext);
  const { cartCount } = useContext(CartContext);

  return (
    <CartIconContainer onClick={() => setIsCartOpen(!isCartOpen)}>
      <ShoppingIcon className='shopping-icon' />
      <IconCount>{cartCount}</IconCount>
    </CartIconContainer>
  );
}
