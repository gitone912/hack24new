import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useRegisterUserMutation } from "../../services/userAuthApi";
import { storeToken, storeId } from "../../services/LocalStorageService";
import { Alert } from "@material-tailwind/react";
import { useCreateAccountProfileMutation } from "@/services/userAccountApi";
import { useCreateDashboardMutation } from "@/services/courseServiceApi";
import { v4 as uuidv4 } from 'uuid';

export function SignUp() {

  const [server_error, setServerError] = useState({});
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [createUser, responseInfo] = useCreateAccountProfileMutation();
  const [createDashboard, responseInfo1] = useCreateDashboardMutation();
  // const [saveUserId, responseInfo2] = useSaveUserIdMutation();
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
      terms: data.get("terms"),
    };

   
    const res = await registerUser(actualData);
    const response = await createUser({ user: actualData.email,name: actualData.name });
    const DashboardResponse = await createDashboard({ user: actualData.email ,"courses": [
   
    ],
    "playlists": [
     
    ],
    "notes": [
     
    ],
    "videos": [
      
    ],
    "all_notes": [
      
    ] });
    // console.log("res", res);
    // console.log("res", response);
    // console.log("res", DashboardResponse);

    if (res.error) {
      setServerError(res.error.data.errors);
    }

    

      storeToken(res.data.data.token);
      storeId(DashboardResponse.data.id);
      
     

      // console.log(userId, actualData.name, actualData.email);

        window.location.href = "/dashboard/profile";
        if (res.isLoading) return <div>is loading......</div>;
  if (res.isError)
    return <div>error occurred {res.error.error}</div>;
  if (isLoading) return <div>is loading......</div>;
      
    }
  

  
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
        <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Full Name" size="lg" type="text"
                  name="name"
                  required/>
                  {server_error.name ? (
                <Alert className="bg-[#d0342c]/10 text-[#d0342c] border-l-4 border-[#d0342c] rounded-none font-small">
                  {server_error.name[0]}
                </Alert>
              ) : null}
            <Input type="email" label="Email" size="lg" id="email"
                  name="email"
                  
                  autoComplete="email"
                  required/>
                  {server_error.email ? (
                <Alert className="bg-[#d0342c]/10 text-[#d0342c] border-l-4 border-[#d0342c] rounded-none font-small">
                  {server_error.email[0]}
                </Alert>
              ) : null}
            <Input type="password" label="Password" size="lg" id="password"
                  name="password"
                 
                  autoComplete="current-password"
                  required/>
                   {server_error.password ? (
                <Alert className="bg-[#d0342c]/10 text-[#d0342c] border-l-4 border-[#d0342c] rounded-none font-small">
                  {server_error.password}
                </Alert>
              ) : null}
            <Input type="password" label="Confirm Password" size="lg"  id="password"
                  name="confirmPassword"
                  
                  required/>
                  {server_error.confirmPassword ? (
                <Alert className="bg-[#d0342c]/10 text-[#d0342c] border-l-4 border-[#d0342c] rounded-none font-small">
                  {server_error.confirmPassword[0]}
                </Alert>
              ) : null}
            <div className="-ml-2.5">
              <Checkbox label="I agree the Terms and Conditions" name="terms"
              id="terms"/>
            </div>
            {server_error.terms ? (
              <span style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>
                {server_error.terms[0]}
              </span>
            ) : null}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit">
            {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/auth/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
          </form>
        </Card>
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
  <Alert
    color="blue"  
    className="max-w-screen-md bg-blue-500"  // Adjust the color class accordingly
    icon={
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
    }
  >
    <Typography variant="h5" color="white">
      Thankyou for SigningUp
    </Typography>
    <Typography color="white" className="mt-2 font-normal">
     Redirecting.......
    </Typography>
  </Alert>
</div>

      )}
      </div>
    </>
  );
}

export default SignUp;
