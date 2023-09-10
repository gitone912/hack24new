import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import { useGetOneDashboardQuery } from "@/services/courseServiceApi";
import { getId } from "@/services/LocalStorageService";
import Error404 from "../NoAuth404";
import { useGetUserMonthlyRepMutation } from "@/services/courseServiceApi";
import { useGetUserWeeklyRepMutation } from "@/services/courseServiceApi";
import { useGetLoggedUserQuery } from "@/services/userAuthApi";
import { getToken } from "@/services/LocalStorageService";
import { useState,useEffect } from "react";
import { chartsConfig } from "@/configs";
export function Home() {




  const id = getId()
  const Response = useGetOneDashboardQuery(id);
  const { access_token } = getToken();
  const [profileDetails, setProfileDetails] = useState(null);
  const { data: loggedUser, isLoading } = useGetLoggedUserQuery(access_token);
  const [getUserWeeklyReport, { isLoading: isProfileLoading }] = useGetUserWeeklyRepMutation();
  const [getUserMonthlyReport, { isLoading: isProfileLoading1 }] = useGetUserMonthlyRepMutation();
  const [weekly, setWeekly] = useState(null);
  const [monthly, setMonthly] = useState(null);
  
  if(Response.isSuccess){
    var courses = Response.data.courses
    var videos = Response.data.videos
    var notes = Response.data.notes
    var playlist = Response.data.playlists
    console.log("courses",courses)
    console.log("videos",videos)
    console.log("notes",notes)
    console.log("playlist",playlist)
  }
  const handleClick = (NotesId) => {
    window.location.href = `/notes/${NotesId}`;
  };
  const handlevideoClick = (videoId) => {
    window.location.href = `courses/view-video/${videoId}`;
  };
  useEffect(() => {
  }, [loggedUser]);
  const handleEmailFetch = async () => {
    try {
      if (loggedUser && loggedUser.data && loggedUser.data.email) {
        const email = loggedUser.data.email;
        console.log("Email", email);
        const Weeklyresponse = await getUserWeeklyReport(email);
        const Monthlyresponse = await getUserMonthlyReport(email);
        setWeekly(Weeklyresponse.data);
        setMonthly(Monthlyresponse.data);  
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


  const getCurrentWeekNumber = () => {
    const now = new Date();
    const dayOfMonth = now.getDate();
    const weekNumber = Math.ceil(dayOfMonth / 7);
    
    return weekNumber;
  };

  // Function to get the current month number
  const getCurrentMonthNumber = () => {
    const now = new Date();
    const monthNumber = now.getMonth() + 1;
    return monthNumber;
  };

  // Use the current week and month number to filter the data
  const currentMonthNumber = getCurrentMonthNumber();
  const currentWeekNumber = getCurrentWeekNumber();
  console.log("weekNumber", currentWeekNumber);

  const weeklyData = weekly?.filter(
    (data) =>
      data.week_number === currentWeekNumber && data.month_number === currentMonthNumber
  );
  const monthlyData = monthly?.filter(
    (data) => data.month === currentMonthNumber
  );

  const websiteViewsChart = {
    type: "bar",
    height: 220,
    series: [
      {
        name: "$",
        data: weeklyData ? weeklyData.map((data) => data.hours_watched) : [],

      },
    ],
    options: {
      ...chartsConfig,
      colors: "#fff",
      plotOptions: {
        bar: {
          columnWidth: "16%",
          borderRadius: 5,
        },
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: weekly ? weeklyData.map((data) => `${data.weekday}`) : [],
      },
    },
  };

  const dailySalesChart = {
    type: "line",
    height: 220,
    series: [
      {
        name: "$",
        data: monthly ? monthly.map((data) => data.hours_watched) : [],
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#fff"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: monthly ? monthly.map((data) => `${data.month}`) : [],
      },
    },
  };

  const completedTasksChart = {
    type: "line",
    height: 220,
    series: [
      {
        name: "Tasks",
        data: weeklyData ? weeklyData.map((data) => data.playlists_completed) : [],
      },
    ],
    options: {
      ...chartsConfig,
      colors: ["#fff"],
      stroke: {
        lineCap: "round",
      },
      markers: {
        size: 5,
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: weekly ? weeklyData.map((data) => data.weekday) : [],
      },
    },
  };

  const statisticsChartsData = [
    {
      color: "blue",
      title: "Weekly Earnings View",
      description: "Data of your Weekly Earnings from our website",
      footer: "last updated on Monday",
      chart: websiteViewsChart,
    },
    {
      color: "pink",
      title: "Monthly view",
      description: "Data of Your Monthly Earning in a year from our website",
      footer: "last updated 1st June 2023",
      chart: dailySalesChart,
    },
    {
      color: "green",
      title: "Completed Tasks",
      description: "Total Completed Tasks in a week of clients from our website",
      footer: "last updated yesterday",
      chart: completedTasksChart,
    },
  ];



if (Response.isLoading) return <div>Loading.....</div>;
  if (Response.isError) return <div>{Response.error.message}<Error404/> </div>;
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
        integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
        crossOrigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <Typography variant="h5" color="black" className="mb-1">
        Your selected Playlists
        

      </Typography>
      <div className="mt-12">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {playlist?.map(({ icon, title,footerLabel, total_hours_playlist,color }) => (
            <StatisticsCard
              key={title}
              value ={total_hours_playlist}
              title="Total Time Of Plalist"
              color= {color}
              icon={<i className={"fa-brands fa-" + icon + " fa-2xl text-white"}></i>}

              // {React.createElement(icon, {
              //   className: "w-6 h-6 text-white",
              // })}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                 
                  &nbsp;{footerLabel}
                </Typography>
              }
            />
          ))}
        </div>
        
        <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          {statisticsChartsData.map((props) => (
            <StatisticsChart
              key={props.title}
              {...props}
              footer={
                <Typography
                  variant="small"
                  className="flex items-center font-normal text-blue-gray-600"
                >
                  <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                  &nbsp;{props.footer}
                </Typography>
              }
            />
          ))}
        </div>
       
      </div>
    </>
  );
}

export default Home;
