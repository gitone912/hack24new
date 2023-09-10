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

export function UpdatePost() {
  const url = getStaticURL();
  const { access_token } = getToken();
  const { data: loggedUser, isLoading } = useGetLoggedUserQuery(access_token);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {}, [loggedUser]);

  const handleUpdatePost = async (e) => {
    try {
      if (loggedUser && loggedUser.data && loggedUser.data.email) {
        const email = loggedUser.data.email;
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        // Modify the field names to match the structure of the raw data
        formData.append("user", email);
        formData.append("contact_person", formData.get("contact_person"));
        formData.append("contact_email", formData.get("contact_email"));
        formData.append("contact_phone", formData.get("contact_phone"));
        formData.append("business_address", formData.get("business_address"));
        formData.append("city", formData.get("city"));
        formData.append("state_province", formData.get("state_province"));
        formData.append("job_title", formData.get("job_title"));
        formData.append("job_description", formData.get("job_description"));
        formData.append("job_type", formData.get("job_type"));
        formData.append("job_category", formData.get("job_category"));
        formData.append("required_skills", formData.get("required_skills"));
        formData.append("experience_level", formData.get("experience_level"));
        formData.append("education_requirements", formData.get("education_requirements"));
        formData.append("salary_range", formData.get("salary_range"));
        formData.append("job_location", formData.get("job_location"));
        formData.append("how_to_apply", formData.get("how_to_apply"));
        formData.append("application_deadline", formData.get("application_deadline"));
        formData.append("application_instructions", formData.get("application_instructions"));
        formData.append("job_poster_linkedin", formData.get("job_poster_linkedin"));
        formData.append("terms_and_conditions_accepted", formData.get("terms_and_conditions_accepted"));
        formData.append("privacy_policy_accepted", formData.get("privacy_policy_accepted"));

        const response = await axios.post(`${url}account/posts/`, formData, {
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
              <Input size="lg" label="Contact Person" name="contact_person" required />
              <Input size="lg" label="Contact Email" name="contact_email" required />
              <Input size="lg" label="Contact Phone" name="contact_phone" required />
              <Input size="lg" label="Business Address" name="business_address" />
              <Input size="lg" label="City" name="city" />
              <Input size="lg" label="State/Province" name="state_province" />
              <Input size="lg" label="Job Title" name="job_title" required />
              <Input size="lg" label="Job Description" name="job_description" required />
              <Input size="lg" label="Job Type" name="job_type" />
              <Input size="lg" label="Job Category" name="job_category" />
              <Input size="lg" label="Required Skills" name="required_skills" />
              <Input size="lg" label="Experience Level" name="experience_level" />
              <Input size="lg" label="Education Requirements" name="education_requirements" />
              <Input size="lg" label="Salary Range" name="salary_range" />
              <Input size="lg" label="Job Location" name="job_location" />
              <Input size="lg" label="How to Apply" name="how_to_apply" />
              <Input size="lg" label="Application Deadline" name="application_deadline" />
              <Input size="lg" label="Application Instructions" name="application_instructions" />
              <Input size="lg" label="Job Poster LinkedIn" name="job_poster_linkedin" />
              <Input size="lg" label="Terms and Conditions Accepted" name="terms_and_conditions_accepted" type="checkbox" />
              <Input size="lg" label="Privacy Policy Accepted" name="privacy_policy_accepted" type="checkbox" />
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
