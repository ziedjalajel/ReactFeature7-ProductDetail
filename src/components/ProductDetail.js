
import { DetailWrapper } from "../styles";


const ProductDetail = ({product,setCurrentProduct}) => {
  return (
    <DetailWrapper>
    <img alt={product.name} src={product.image} />
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p className="product-price">{product.price} KD</p>
      <button onClick={()=> setCurrentProduct(null)} >Go Back</button>
    </DetailWrapper>
  );
};

export default ProductDetail;
