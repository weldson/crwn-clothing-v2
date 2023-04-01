import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';

import './checkout-item.styles.scss';

export const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const clearItemHandler = () => {
    // clearItemFromCart(cartItem);
    dispatch(clearItemFromCart(cartItems, cartItem));
  }

  const addItemHandler = () => {
    // addItemToCart(cartItem);
    dispatch(addItemToCart(cartItems, cartItem));
  }

  const removeItemHandler = () => {
    // removeItemFromCart(cartItem);
    dispatch(removeItemFromCart(cartItems, cartItem));
  }

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">
        {name}
      </span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">
        {price}
      </span>
      <div className="remove-button" onClick={clearItemHandler}>&#10005;</div>
    </div>
  )
}
