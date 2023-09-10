import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
} from "@material-tailwind/react";
import { getToken } from "@/services/LocalStorageService";
import { useGetLoggedUserQuery } from "@/services/userAuthApi";
import { getStaticURL } from "@/services/url";


export function EditProfile() {
  const url = getStaticURL();
  const { access_token } = getToken();
  const { data: loggedUser, isLoading } = useGetLoggedUserQuery(access_token);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {}, [loggedUser]);

  const handleUpdateProfile = async (e) => {
    try {
      if (loggedUser && loggedUser.data && loggedUser.data.email) {
        const email = loggedUser.data.email;
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        formData.append("user", email);
        formData.append("name", formData.get("Name"));
        formData.append("image", selectedImage);
        formData.append("location", formData.get("location"));
        formData.append("skills", formData.get("skills"));

        // Update these lines to match your new backend fields
        formData.append("occupation", formData.get("occupation"));
        formData.append("experience", formData.get("experience"));
        formData.append("portfolio", formData.get("portfolio"));
        formData.append("languages", formData.get("languages"));
        formData.append("references", formData.get("references"));
        formData.append("education", formData.get("education"));

        const response = await axios.post(
          `${url}account/update-profile/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
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

              {/* Update these lines to match your new backend fields */}
              <Input size="lg" label="Occupation" name="occupation" />
              <Input size="lg" label="Experience" name="experience" />
              <Input size="lg" label="Portfolio" name="portfolio" />
              <Input size="lg" label="Languages" name="languages" />
              <Input size="lg" label="References" name="references" />
              <Input size="lg" label="Education" name="education" />

              <Input size="lg" label="Location" name="location" required />
              <Input size="lg" label="Skills" name="skills" required />

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
