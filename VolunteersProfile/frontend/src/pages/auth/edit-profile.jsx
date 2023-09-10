import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { getToken } from "@/services/LocalStorageService";
import { useGetLoggedUserQuery } from "@/services/userAuthApi";
import { useEffect } from "react";
import { Form } from "react-router-dom";
import { getStaticURL } from "@/services/url";

export function EditProfile() {
  const url = getStaticURL();
  const { access_token } = getToken();
  const { data: loggedUser, isLoading } = useGetLoggedUserQuery(access_token);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {}, [loggedUser]);

  const handleUpdateProfile = async (e) => {
    try {
      if (loggedUser && loggedUser.data && loggedUser.data.email) {
        const email = loggedUser.data.email;
        const name = loggedUser.data.name;
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        formData.append("user", email);
        formData.append("name", formData.get("Name"));
        formData.append("image", selectedImage); // Append the selected image file
        formData.append("description", formData.get("description"));
        formData.append("location", formData.get("location"));
        formData.append("skills", formData.get("skills"));
        formData.append("mobile_number", formData.get("mobileNumber"));
        console.log("formData", formData);

        const response = await axios.post(`${url}/account/update-profile/`, formData, {
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
            Edit Profile
          </Typography>
        </CardHeader>
        <CardBody className="flex items-center justify-center overflow-x-scroll px-0 pt-0 pb-2">
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleUpdateProfile}>
            <div className="mb-4 flex flex-col gap-6">
              <Typography color="gray">Profile Information</Typography>
              <Input size="lg" label="Email" value={loggedUser?.data.email} readOnly />
              <Input size="lg" label="Name" name="Name" required />

              <Input size="lg" label="Description" name="description" required />
              <Input size="lg" label="Location" name="location" required />
              <Input size="lg" label="Skills" name="skills" required />
              <Input size="lg" label="Mobile Number" name="mobileNumber" />
              <Input size="lg" label="Instagram" name="social_link1" />
              <Input size="lg" label="LinkedIn" name="social_link2" />
              <Input size="lg" label="Facebook" name="social_link3" />

              <Input type="file" label="Profile Image" onChange={handleImageChange} />
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
