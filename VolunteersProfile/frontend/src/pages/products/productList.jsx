import { useState } from "react";
import { useListProductsQuery } from "../../services/productServiceApi";
import { useListProductCategoriesQuery } from "../../services/productServiceApi";

import {
  Carousel,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Radio,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  StarIcon,
  HeartIcon,
  WifiIcon,
  HomeIcon,
  TvIcon,
  FireIcon,
} from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

const ListProducts = () => {
  const responseInfo = useListProductsQuery();
  const CategoryInfo = useListProductCategoriesQuery();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  const handleAddToCart = (productId) => {
    window.location.href = `/products/${productId}`;
  };

  if (responseInfo.isLoading) return <div>Loading...</div>;
  if (responseInfo.isError)
    return <div>Error occurred: {responseInfo.error.error}</div>;
  if (responseInfo.isLoading) return <div>is loading......</div>;
  if (responseInfo.isError)
    return <div>error occured {responseInfo.error.error} </div>;

  const products = responseInfo.data;
  const categories = CategoryInfo.data;
  console.log(categories[0].title);
  console.log(products)

  return (
    <>
      <style>
        {`
    @media (max-width: 639px) {
  .filterbar {
    max-width: 100%;
  }
  
  .font-medium {
    font-size: 12px;
  }
}

@media (min-width: 640px) and (max-width: 1023px) {
  .filterbar {
    max-width: 80%;
  }
  
  .font-medium {
    font-size: 14px;
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .filterbar {
    max-width: 60%;
  }
  
  .font-medium {
    font-size: 16px;
  }
}
`}
      </style>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <div className="flex justify-center items-center mt-8 mb-4 px-4">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
          All Projects
        </h2>
      </div>
      <div className="flex justify-center items-center mt-8 mb-4 px-4">
        <Card className="w-full max-w-[40rem] filterbar">
          <List className="flex-row">
            <ListItem className="p-0">
              <label
                htmlFor="category-all"
                className="px-3 py-2 flex items-center w-full cursor-pointer"
              >
                <ListItemPrefix className="mr-3">
                  <Radio
                    name="horizontal-list"
                    id="category-all"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                    checked={selectedCategory === null}
                    onChange={() => handleCategoryChange(null)}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  All
                </Typography>
              </label>
            </ListItem>
            {categories.map((category) => (
              <ListItem className="p-0" key={category.id}>
                <label
                  htmlFor={`category-${category.id}`}
                  className="px-3 py-2 flex items-center w-full cursor-pointer"
                >
                  <ListItemPrefix className="mr-3">
                    <Radio
                      name="horizontal-list"
                      id={`category-${category.id}`}
                      ripple={false}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                      checked={
                        selectedCategory === category.title ||
                        selectedCategory === category.id
                      }
                      onChange={() =>
                        handleCategoryChange(category.title || category.id)
                      }
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    {category.title}
                  </Typography>
                </label>
              </ListItem>
            ))}
          </List>
        </Card>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">All Projects</h2>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products
              .filter((product) => {
                if (!selectedCategory) {
                  return true; // Display all products if no category is selected
                } else {
                  // Filter products based on category title or id
                  return product.category === selectedCategory;
                }
              })
              .map((product) => (
                <Card key={product.id} className="group">
                  <CardHeader color="blue-gray">
                  <img
      src={product.image_link}
      alt={product.imageAlt}
      className="h-40 w-60 object-cover object-center group-hover:opacity-75"
    />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
                  </CardHeader>
                  <CardBody>
                    <div className="mb-3 flex items-center justify-between">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                      >
                        <StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
                        {product.rating}
                      </Typography>
                    </div>
                    <Typography color="gray">
                      {product.technical_details}
                    </Typography>
                    <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                      {product.languageUsed1 && (
                        <Tooltip content={product.languageUsed1}>
                          <span className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-black-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70">
                            <i
                              className={`fa-brands fa-${product.languageUsed1} h-5 w-5`}
                            ></i>
                          </span>
                        </Tooltip>
                      )}
                      {product.languageUsed2 && (
                        <Tooltip content={product.languageUsed2}>
                          <span className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-black-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70">
                            <i
                              className={`fa-brands fa-${product.languageUsed2} h-5 w-5`}
                            ></i>
                          </span>
                        </Tooltip>
                      )}
                      {product.languageUsed3 && (
                        <Tooltip content={product.languageUsed3}>
                          <span className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-black-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70">
                            <i
                              className={`fa-brands fa-${product.languageUsed3} h-5 w-5`}
                            ></i>
                          </span>
                        </Tooltip>
                      )}
                      {product.languageUsed4 && (
                        <Tooltip content={product.languageUsed4}>
                          <span className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-black-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70">
                            <i
                              className={`fa-brands fa-${product.languageUsed4} h-5 w-5`}
                            ></i>
                          </span>
                        </Tooltip>
                      )}
                    </div>
                  </CardBody>
                  <CardFooter className="pt-3">
                    <Button
                      size="lg"
                      fullWidth={true}
                      className="bg-gray-300 text-black hover:bg-gray-500 hover:shadow-md"
                      onClick={() => handleAddToCart(product.id)} 
                    >
                      <Typography
                        variant="h6"
                        className="text-purple -600 inline"
                      >
                        {product.price}
                      </Typography>{" "}
                      &nbsp;&nbsp;&nbsp; Add to cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProducts;
