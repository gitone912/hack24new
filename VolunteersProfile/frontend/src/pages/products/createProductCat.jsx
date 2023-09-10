import { useCreateProductCategoryMutation } from "../../services/productServiceApi";
import { useSaveUserIdMutation } from "../../services/userAuthApi";

const CreateProductCategory = () => {
  const [createProduct, responseInfo] = useCreateProductCategoryMutation();
  const [saveUserId, responseInfo2] = useSaveUserIdMutation();

  if (responseInfo.isLoading) return <div>is loading......</div>;
  if (responseInfo.isError)
    return <div>error occured {responseInfo.error.error} </div>;
  return (
    <div>
      <button
        onClick={() => {
          createProduct({
            title: "Smartwa new one",
            parent_category_id: 4,
          });
        }}
      >
        crete post
      </button>
      <button
        onClick={() => {
          saveUserId({
        "user": "nani@gmail.com",
        "user_cart_id": 1,
        "name": "romio"
    });
        }}
      >
        save userid
      </button>
    </div>
  );
};
export default CreateProductCategory;
