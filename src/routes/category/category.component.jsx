import { useEffect, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { ProductCard } from '../../components/product-card/product-card.component';

import { Title, CategoryContainer } from './category.styles';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/category/categoty.selector';
import { useSelector } from 'react-redux';
import { Spinner } from '../../components/spinner/spinner.component';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);


  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category}</Title>
      {isLoading ? <Spinner /> : (

          <CategoryContainer>
            {products && products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
