import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import {
  ProductCardContainer,
  Image,
  Footer,
  Button,
  Name,
  Price
} from './product-card.styles';

export const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const dispatch = useDispatch()

  const cartItems = useSelector(selectCartItems)
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer>
      <Image src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button onClick={addProductToCart}>
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};
