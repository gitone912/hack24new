import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import React from "react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { conversationsData, projectsData } from "@/data";
import { useGetLoggedUserQuery } from "@/services/userAuthApi";
import { getToken } from "../../services/LocalStorageService";
import { useGetAccountProfileMutation } from "@/services/userAccountApi";
import { useState, useEffect } from "react";
import { useGetPostsQuery } from "@/services/userAccountApi";
import { useGetMyPostsMutation } from "@/services/userAccountApi";
import Error404 from "../NoAuth404";
import { getStaticURL } from "@/services/url";
export function Profile() {
  const url = getStaticURL();
  const { access_token } = getToken();
  const [profileDetails, setProfileDetails] = useState(null);
  const [posts, setPosts] = useState(null);
  const { data: loggedUser, isLoading } = useGetLoggedUserQuery(access_token);

  const [getAccountProfile, { isLoading: isProfileLoading }] =
    useGetAccountProfileMutation();
  const [getMyPosts, { isLoading: isMyPostsLoading }] = useGetMyPostsMutation();

  useEffect(() => {}, [loggedUser]);

  const handleEmailFetch = async () => {
    try {
      if (loggedUser && loggedUser.data && loggedUser.data.email) {
        const email = loggedUser.data.email;
        console.log("Email", email);
        const response = await getAccountProfile(email);
        const postsResponse = await getMyPosts(email);
        setProfileDetails(response.data);
        setPosts(postsResponse.data);
      } else {
        console.error("Logged user or email not available.");
      }
    } catch (error) {
      console.error("Failed to fetch profile details:", error);
    }
  };

  useEffect(() => {
    handleEmailFetch();
  }, [loggedUser]);
  const EditProf = async () => {
    {
      window.location.href = "/dashboard/edit-profile";
    }
  };
  const UploadPosts = async () => {
    {
      window.location.href = "/dashboard/upload-post";
    }
  };
  const viewPost = (post) => {
    window.location.href = `/dashboard/view-post/${post}`;
  };
  if (!loggedUser) {
    return <Error404 />;
  }
  if (
    isLoading ||
    isProfileLoading ||
    !loggedUser ||
    !profileDetails ||
    !posts
  ) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
        crossOrigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              {profileDetails?.image ? (
                <Avatar
                  src={profileDetails?.image}
                  alt="Profile Image"
                  size="xl"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
              ) : (
                <Avatar
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                  alt="User Icon"
                  size="xl"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
              )}
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {profileDetails?.name}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {profileDetails?.about}
                </Typography>
              </div>
            </div>
            <div className="w-46">
              <Tabs value="app">
                <TabsHeader>
                  <Tab value="message" onClick={EditProf}>
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Edit Profile
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <ProfileInfoCard
              title="Profile Information"
              description={profileDetails?.description}
              details={{
                mobile: profileDetails?.mobile_number,
                email: loggedUser.data.email,
                location: profileDetails?.location,
                skills: profileDetails?.skills,
                social: (
                  <div className="flex items-center gap-4">
                    <i className="fa-brands fa-facebook text-blue-700" />
                    <i className="fa-brands fa-linkedin text-blue-400" />
                    <i className="fa-brands fa-instagram text-purple-500" />
                  </div>
                ),
              }}
            />
            {/* <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Students similar skills as you
              </Typography>
              <ul className="flex flex-col gap-6">
                {conversationsData.map((props) => (
                  <MessageCard
                    key={props.name}
                    {...props}
                    action={
                      <Button variant="text" size="sm">
                        Follow
                      </Button>
                    }
                  />
                ))}
              </ul>
            </div> */}
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
