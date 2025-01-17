// Styling

import { ProductWrapper } from "../styles";
import DeleteButton from "./Buttons/DeleteButton";

const ProductItem = (props) => {
  const product = props.product;

  return (
    <ProductWrapper>
      <img onClick={()=> props.setCurrentProduct(product)} alt={product.name} src={product.image} />
      <p>{product.name}</p>
      <p className="product-price">{product.price} KD</p>
      <DeleteButton deleteProduct={props.deleteProduct} productID={product.id}/>
    </ProductWrapper>
  );
};

export default ProductItem;
