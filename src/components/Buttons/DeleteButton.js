import { DeleteButtonStyled } from "../../styles";

const DeleteButton = (props)=>{
return <DeleteButtonStyled onClick={()=>props.deleteProduct(props.productID)}>
    Delete
    </DeleteButtonStyled>
}
export default DeleteButton
