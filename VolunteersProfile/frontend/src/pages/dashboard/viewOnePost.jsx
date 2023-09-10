import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function ViewPost() {
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
                Python Developer
              </Typography>
              <Typography variant="small" className="font-normal text-blue-gray-500">
                Signimus Technologies
              </Typography>

              <div className="mt-6">
                <Card color="transparent" shadow={false}>
                  <CardHeader
                    floated={false}
                    color="gray"
                    className="mx-0 mt-0 mb-4 rounded-t-lg"
                  >
                    <img
                      src="https://www.techrepublic.com/wp-content/uploads/2023/03/tra232323-python-coding-bundle.png"
                      alt="Post Image"
                      className="h-full w-full rounded-t-lg"
                    />
                  </CardHeader>

                  <CardBody className="py-0 px-2">
                    <div className="flex items-center">
                      <Avatar
                        src="https://via.placeholder.com/150"
                        alt="User Avatar"
                        size="small"
                      />
                      <Typography
                        variant="body"
                        color="blue-gray-500"
                        className="font-normal ml-2"
                      >
                        new road tiles pvt ltd
                      </Typography>
                    </div>

                    <Typography variant="h5" color="blue-gray-800" className="mt-1 mb-2">
                      Web developer with 5 years of experience 
                      skills : html , css , javascript , react , nodejs , express , mongodb
                    </Typography>

                    <Typography variant="body" color="blue-gray-500" className="font-normal">
                      5 years of experience
                      Deploying a full-stack web application to Heroku
                      Developer responsible for the development of new software products and enhancements to existing products
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
                        Apply for the job 
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
