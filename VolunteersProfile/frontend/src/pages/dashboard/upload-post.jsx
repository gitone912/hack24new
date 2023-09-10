import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { getToken } from "@/services/LocalStorageService";
import { useGetLoggedUserQuery } from "@/services/userAuthApi";
import { useEffect } from "react";
import { Form } from "react-router-dom";
import { getStaticURL } from "@/services/url";

export function UpdatePost() {
  const url = getStaticURL();
  const { access_token } = getToken();
  const { data: loggedUser, isLoading } = useGetLoggedUserQuery(access_token);
  const [selectedImage, setSelectedImage] = useState('');
  const timestamp = Date.now();

  useEffect(() => {}, [loggedUser]);

  const handleUpdatePost = async (e) => {
    try {
      if (loggedUser && loggedUser.data && loggedUser.data.email) {
        const email = loggedUser.data.email;
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        formData.append("user", email);
        formData.append("title", formData.get("title"));
        formData.append("description", formData.get("description"));
        formData.append("img", selectedImage); // Append the selected image file
        formData.append("tag", formData.get("tag"));
        formData.append("post_id", timestamp);
        formData.append("location", formData.get("location"));
        formData.append("hashtags", formData.get("hashtags"));
        formData.append("privacy", formData.get("privacy"));
        console.log("formData", formData);

        const response = await axios.post(`${url}/account/posts/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("response", response.data);
        window.location.href = "/dashboard/profile";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  return (
    <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Upload Post 
          </Typography>
        </CardHeader>
        <CardBody className="flex items-center justify-center overflow-x-scroll px-0 pt-0 pb-2">
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleUpdatePost}>
            <div className="mb-4 flex flex-col gap-6">
              
              <Typography color="gray">Upload new Post </Typography>
              <Input size="lg" label="Title" name="title" required />
              <Input size="lg" label="Description" name="description" required />
              <Input size="lg" label="Image" type="file" onChange={handleImageChange} required/>
              <Input size="lg" label="Tag" name="tag" required />
              <Input size="lg" label="Location" name="location" required />
              <Input size="lg" label="Hashtags" name="hashtags" required />
              <Input size="lg" label="Privacy" name="privacy" />
            </div>

            <Button className="mt-6" fullWidth type="submit">
              Update
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
