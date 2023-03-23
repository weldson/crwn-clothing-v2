import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

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
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

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
}
