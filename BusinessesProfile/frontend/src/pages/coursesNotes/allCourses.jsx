import React from "react";
import {
  Typography,
  Alert,
  Avatar,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useListAllCourseQuery } from "@/services/courseServiceApi";

export function AllCourses() {
  const courseResponse = useListAllCourseQuery();
  const res = courseResponse.data;
  console.log("Courses", res);
  const handleVideos = (courseId) => {
    window.location.href = `courses/${courseId}`;
  };
  return (
    <div className="mx-auto my-10">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-4 p-4">
          <Typography variant="h6" color="white">
            Courses
          </Typography>
        </CardHeader>
        <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              All Posts
            </Typography>
           
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {res?.map(({ id, title, description,image_link }) => (
              <Card
  key={id}
  shadow={false}
  className="relative grid h-[20rem] w-full max-w-[15rem] items-end justify-center overflow-hidden text-center md:w-full lg:w-full md:h-[20rem] lg:h-[20rem] "
>

<CardHeader
  floated={false}
  shadow={false}
  color="transparent"
  className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center`}
  style={{ backgroundImage: `url(${image_link})` }}
>
  <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
</CardHeader>

      <CardBody className="relative py-14 px-6 md:px-12">
      <Typography
  variant="h2"
  color="white"
  className="mb-6 font-medium leading-[1.5] text-2xl md:text-2xl lg:text-2xl"
>
  {title}
</Typography>

<Typography
  variant="h6"
  className="mb-3 text-gray-400 text-sm md:text-base lg:text-lg"
>
  {description}
</Typography>

<button
  onClick={() => handleVideos(id)}
  className="mt-2 rounded-md bg-green-500 px-3 py-1.5 text-white text-xs md:text-sm lg:text-base"
>
  Videos
</button>


      </CardBody>
    </Card>
  ))}
            </div>
          </div>
      </Card>
    </div>
  );
}
