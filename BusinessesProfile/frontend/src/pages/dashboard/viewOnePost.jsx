import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Button,
} from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import { useGetPostsQuery } from "@/services/userAccountApi";
import { useParams } from "react-router-dom";

export function ViewPost() {
  const { postId } = useParams();
  const postsResponse = useGetPostsQuery(postId);
  const res = postsResponse.data;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
        crossOrigin="anonymous"
        referrerpolicy="no-referrer"
      />

      <div className="flex justify-center">
        <Card className="w-full md:w-3/4 lg:w-1/2">
          <CardBody className="p-2">
            <CardHeader variant="gradient" color="blue" className="mb-4 p-3 rounded-t-lg">
              <Typography variant="h6" color="white">
                Post
              </Typography>
            </CardHeader>

            <div className="px-4 pb-4">
              <Typography variant="h6" color="blue-gray-500" className="mb-2">
                All Posts
              </Typography>
              <Typography variant="small" className="font-normal text-blue-gray-500">
                Latest Posts
              </Typography>

              <div className="mt-6">
                <Card color="transparent" shadow={false}>
                  <CardHeader
                    floated={false}
                    color="gray"
                    className="mx-0 mt-0 mb-4 rounded-t-lg"
                  >
                    <img
                      src={res && res.img}
                      alt="Post Image"
                      className="h-full w-full rounded-t-lg"
                    />
                  </CardHeader>

                  <CardBody className="py-0 px-2">
                    <div className="flex items-center">
                      <Avatar
                        src={res && res.userAvatar}
                        alt={res && res.user}
                        color="lightBlue"
                        size="xs"
                        className="mr-2"
                      />
                      <Typography
                        variant="body"
                        color="blue-gray-500"
                        className="font-normal"
                      >
                        {res && res.user}
                      </Typography>
                    </div>

                    <Typography variant="h5" color="blue-gray-800" className="mt-1 mb-2">
                      {res && res.title}
                    </Typography>

                    <Typography variant="body" color="blue-gray-500" className="font-normal">
                      {res && res.description}
                    </Typography>
                  </CardBody>

                  <CardFooter className="mt-6 flex items-center justify-between py-2 px-4">
                    <div>
                     

                      <Button
                        color="lightBlue"
                        ripple="light"
                        size="regular"
                        buttonType="filled"
                        rounded={false}
                        block={false}
                        iconOnly={false}
                      >
                        {res && res.tag}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
