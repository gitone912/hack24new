import { useUpdateProductCategoryMutation } from "../../services/productServiceApi";

const UpdateProductCategory = () => {
  const [updateProduct, responseInfo] = useUpdateProductCategoryMutation();
  if (responseInfo.isLoading) return <div>is loading......</div>;
  if (responseInfo.isError)
    return <div>error occured {responseInfo.error.error} </div>;
  return (
    <div>
      <button
        onClick={() => {
          updateProduct({
            id: 5,
            title: "Smar",
            parent_category_id: 4,
          });
        }}
      >
        updates post
      </button>
    </div>
  );
};
export default UpdateProductCategory;
