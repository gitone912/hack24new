import { useSingleProductCategoryQuery } from "../../services/productServiceApi";

const GetOneProductCategory = () => {
    const responseInfo = useSingleProductCategoryQuery(5);
    console.log(responseInfo);
    console.log(responseInfo.currentData);

    if (responseInfo.isLoading) return <div>Loading......</div>;
    if (responseInfo.isError) return <div>Error occurred {responseInfo.error.error}</div>;

    return (
        <div>
            <h1>Hello</h1>
            <div>{responseInfo.currentData.id && responseInfo.currentData.title}</div>
            {/* Render other properties of responseInfo.currentData as needed */}
        </div>
    );
}

export default GetOneProductCategory;
