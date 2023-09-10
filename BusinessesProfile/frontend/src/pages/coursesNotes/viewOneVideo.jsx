import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Alert
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useGetOneVideoQuery } from "@/services/courseServiceApi";
import { useParams } from "react-router-dom";
import { useGetLoggedUserQuery } from "@/services/userAuthApi";
import { getToken } from "../../services/LocalStorageService";
import { useUpdateWeeklyUpdateMutation, useUpdateMonthlyUpdateMutation } from "@/services/courseServiceApi";


export function ViewVideo() {
  const { access_token } = getToken();
  const [profileDetails, setProfileDetails] = useState(null);
  const { data: loggedUser, isLoading } = useGetLoggedUserQuery(access_token);
  const { videoId } = useParams();
  console.log("videoId", videoId);
  const videoResponse = useGetOneVideoQuery(videoId);
  const res = videoResponse.data;
  const [weekly, setWeekly] = useState(null);
  const [updateWeeklyUpdate] = useUpdateWeeklyUpdateMutation();
  const [updateMonthlyUpdate] = useUpdateMonthlyUpdateMutation();
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
const [updateNotificationTimeout, setUpdateNotificationTimeout] = useState(null);

  const handleEmailFetch = async (videoDurationInHours) => {
    try {
      if (loggedUser && loggedUser.data && loggedUser.data.email) {
        const email = loggedUser.data.email;
        console.log("Email", email);
        const weeklyUpdateData = {
          user_email: email,
          hours_spent: videoDurationInHours
        };
        const monthlyUpdateData = {
          user_email: email,
          hours_spent: videoDurationInHours, // Update this value with appropriate data
        };
        console.log("weeklyUpdateData", weeklyUpdateData);
        console.log("monthlyUpdateData", monthlyUpdateData);
        // Call the mutations
        await Promise.all([
          sendWeeklyUpdate(weeklyUpdateData),
          sendMonthlyUpdate(monthlyUpdateData),
        ]);

        console.log("Weekly Update Data:", weeklyUpdateData);
        console.log("Monthly Update Data:", monthlyUpdateData);
        
        // Once both mutations have completed, navigate to the desired location
        setShowUpdateNotification(true);

      // Clear any existing timeout
      if (updateNotificationTimeout) {
        clearTimeout(updateNotificationTimeout);
      }

      // Set a new timeout to hide the notification after 1 second
      const timeout = setTimeout(() => {
        setShowUpdateNotification(false);
      }, 3000);

      setUpdateNotificationTimeout(timeout);

      } else {
        console.error("Logged user or email not available.");
      }
    } catch (error) {
      console.error("Failed to fetch profile details:", error);
    }
  };

  

  const sendWeeklyUpdate = (data) => {
    try {
      const response = updateWeeklyUpdate(data);
      console.log("Weekly Update Mutation Response:", response);
    } catch (error) {
      console.error("Failed to update weekly data:", error);
    }
  };

  const sendMonthlyUpdate = (data) => {
    try {
      const response = updateMonthlyUpdate(data);
      console.log("Monthly Update Mutation Response:", response);
    } catch (error) {
      console.error("Failed to update monthly data:", error);
    }
   
  };
    return (
      <div>
        <Card>
          <CardBody className="p-4">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-8 p-6 rounded-t-lg"
            >
              <Typography variant="h6" color="white">
                Video
              </Typography>
            </CardHeader>
  
            <div className="px-4 pb-4">
              <Typography variant="h6" color="blue-gray-500" className="mb-2">
                All Videos
              </Typography>
              <Typography variant="small" className="font-normal text-blue-gray-500">
                Latest Videos
              </Typography>
  
              <div className="mt-6">
                <Card color="transparent" shadow={false}>
                  <CardHeader
                    floated={false}
                    color="gray"
                    className="mx-0 mt-0 mb-4 rounded-t-lg"
                    style={{ paddingTop: "56.25%" }}
                  >
                    <iframe
                      src={res && res.video_link}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full absolute top-0 left-0"
                    />
                  </CardHeader>
  
                  <CardBody className="py-0 px-2">
                    <Typography
                      variant="h5"
                      color="blue-gray-800"
                      className="mt-1 mb-2"
                    >
                      {res && res.title}
                    </Typography>
  
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                    >
                      {res && res.description}
                    </Typography>
                    <Button

                      color="lightBlue"
                      buttonType="filled"
                      size="small"
                      rounded={false} d
                      iconOnly={false}
                      ripple="light"
                      className="mt-4"
                      onClick={() => handleEmailFetch(res?.videoDurationInHours)}
                    >
                     click if completed { res?.videoDurationInHours} Minutes
                    </Button>
                  </CardBody>
                </Card>
              </div>
            </div>
          </CardBody>
        </Card>
        {showUpdateNotification && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <Alert
        open={open}
        color="green"
        className="max-w-screen-md"
        icon={<svg
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
    </svg>}
      >
        <Typography variant="h5" color="white">
          Congrats for Completing
        </Typography>
        <Typography color="white" className="mt-2 font-normal">
          Your Dashboard is &apos; Updated
        </Typography>
      </Alert>
        </div>
      )}
      </div>
    );
  }
  