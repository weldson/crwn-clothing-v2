import { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { CartContext } from '../../context/cart.context';

import './cart-icon.styles.scss';

export const CartIcon = () => {
  const { isCartOpen,setIsCartOpen } = useContext(CartContext);
  const { cartCount } = useContext(CartContext);

  return (
    <div className='cart-icon-container' onClick={() => setIsCartOpen(!isCartOpen)}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  );
}
