import { useDeleteProductCategoryMutation } from "../../services/productServiceApi";

const DeleteProductCategory = () =>{
    const [deleteProduct,responseInfo] = useDeleteProductCategoryMutation()
    if (responseInfo.isLoading) return <div>is loading......</div>
    if (responseInfo.isError) return <div>error occured {responseInfo.error.error} </div>
    return(
        <div>
            <button onClick={()=>{deleteProduct(1)}}>
                delete post
            </button>
        </div>
    )
}
export default DeleteProductCategory