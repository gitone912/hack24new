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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserToken } from "../../features/authSlice";
import { getToken, storeToken } from "../../services/LocalStorageService";
import { useLoginUserMutation } from "../../services/userAuthApi";
import { Alert } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { storeId } from "../../services/LocalStorageService";
import { useGetDashboardIdMutation } from "@/services/courseServiceApi";


export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState({});
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [dashboardid,Dresponse] = useGetDashboardIdMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const actualData = {
      email: email,
      password: password,
    };
    




    // const res3 = await getUserId({
    //   email: actualData.email,
    // });
    // console.log(res3);
    // if (res3.error) {
    //   console.log(res3.error);
    //   setServerError(res3.error);
    // }
    // if (res3.data) {
    //   storeId(res3.data.user_cart_id);
    //   console.log(res3.data.user_cart_id);
    // }



    const res = await loginUser(actualData);
    const Dres = await dashboardid({email:actualData.email})
    console.log(res);
    if (res.error) {
      console.log(res.error.data.data);
      setServerError(res.error.data.data);
    }
    if (res.data) {
      storeToken(res.data.data.token);
      storeId(Dres.data.dashboard_id);
      let { access_token } = getToken();
      dispatch(setUserToken({ access_token: access_token }));
     
      window.location.href = "/dashboard/home";
    }
  };
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
      <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          
          <CardBody className="flex flex-col gap-4">
          {serverError.errors && (
            <Alert className="bg-[#d0342c]/10 text-[#d0342c] border-l-4 border-[#d0342c] rounded-none font-medium">
              {serverError.errors}
            </Alert>
          )}
          {serverError.non_field_errors && (
            <Alert className="bg-[#d0342c]/10 text-[#d0342c] border-l-4 border-[#d0342c] rounded-none font-medium">
              {serverError.non_field_errors[0]}
            </Alert>
          )}
            <Input type="email" label="Email" size="lg" id="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required/>
            <Input type="password" label="Password" size="lg" 
              id="password"
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth type="submit">
            {isLoading ? "Signing In..." : "Sign In"}
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
        </form>
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
      Successfully !!!
    </Typography>
    <Typography color="white" className="mt-2 font-normal">
     Signing In.......
    </Typography>
  </Alert>
</div>

      )}
      </div>
    </>
  );
}

export default SignIn;
