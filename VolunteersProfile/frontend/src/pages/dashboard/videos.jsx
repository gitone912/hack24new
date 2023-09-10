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
import { useListAllVideosQuery } from "@/services/courseServiceApi";
  export function Posts() {
    const { access_token } = getToken();
    const { data: loggedUser, isLoading } = useGetLoggedUserQuery(access_token);
    const [profileDetails, setProfileDetails] = useState(null);
    const VideosResponse = useListAllVideosQuery();
    const [getAccountProfile, { isLoading: isProfileLoading }] =
      useGetAccountProfileMutation();
  
    useEffect(() => {
      console.log("Logged User", loggedUser);
    }, [loggedUser]);
    console.log("Posts", postsResponse.data);
    const handleEmailFetch = async () => {
      try {
        if (loggedUser && loggedUser.data && loggedUser.data.email) {
          const email = loggedUser.data.email;
          console.log("Email", email);
          const response = await getAccountProfile(email);
          setProfileDetails(response.data);
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
  
    const viewPost = (post) => {
      window.location.href = `/dashboard/view-post/${post}`;
    };
    if (isLoading || isProfileLoading) {
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
        <div className="mx-auto my-20 flex max-w-screen-lg flex-col gap-8"></div>
  
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
          <CardBody className="p-4">
            <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
              <Typography variant="h6" color="white">
                Posts
              </Typography>
            </CardHeader>
            <div className="px-4 pb-4">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                All Posts
              </Typography>
              <Typography
                variant="small"
                className="font-normal text-blue-gray-500"
              >
                latest posts
              </Typography>
              <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
                {VideosResponse.data?.map(
                  ({
                    img,
                    title,
                    description,
                    codes,
    video_link,
    videoNumber,
    course,
                    
                    
                  }) => (
                    <Card key={title} color="transparent" shadow={false}>
                      <CardHeader
                        floated={false}
                        color="gray"
                        className="mx-0 mt-0 mb-4 h-full xl:h-full w-full rounded-none bg-transparent"
                      >
                        <img
                          src={img}
                          alt={title}
                          className="h-full w-full object-cover"
                        />
                      </CardHeader>
                      <CardBody className="py-0 px-1">
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          {tag}
                        </Typography>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="mt-1 mb-2"
                        >
                          {title}
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                        >
                          {description}
                        </Typography>
                      </CardBody>
                      <div class="px-6 pt-4 pb-2"></div>
                      <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                        <Link to={route}>
                          <Button
                            variant="outlined"
                            size="sm"
                            type="submit"
                            onClick={() => viewPost(post_id)}
                          >
                            view post
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  )
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </>
    );
  }
  
  export default Posts;
  