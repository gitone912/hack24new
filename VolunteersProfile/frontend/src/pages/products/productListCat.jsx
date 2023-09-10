import { useListProductCategoriesQuery } from "../../services/productServiceApi";

const ListProductCategories= () => {
    const responseInfo = useListProductCategoriesQuery()
    console.log(responseInfo)
    if (responseInfo.isLoading) return <div>is loading......</div>
    if (responseInfo.isError) return <div>error occured {responseInfo.error.error} </div>
    return(
        
        <div>
        <h1>hello</h1> 
        {/* {responseInfo.data.data} */}
        {
            responseInfo.data.map((get)=>
            <div>
                {get.id}
                {get.title}
            </div>
            )
        }
        
        </div>
        
    )
}
export default ListProductCategories