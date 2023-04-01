import { useSelector, useDispatch } from 'react-redux';

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOPen } from '../../store/cart/cart.action';

import {
  CartIconContainer,
  ShoppingIcon,
  IconCount
} from './chart-icon.styles';

export const CartIcon = () => {
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const dispatch = useDispatch();

  const toggleIsCartOpen = () => dispatch(setIsCartOPen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <IconCount>{cartCount}</IconCount>
    </CartIconContainer>
  );
};
