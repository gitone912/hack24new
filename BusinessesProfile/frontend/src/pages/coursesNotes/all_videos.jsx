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
import { useListAllVideosQuery } from "@/services/courseServiceApi";
import { useParams } from "react-router-dom";
import { useUpdateDashboardMutation } from "@/services/courseServiceApi";
import { useGetOneDashboardQuery } from "@/services/courseServiceApi";
import { getId } from "@/services/LocalStorageService";
  export function AllVideos() {
    const id = getId();
  const Response1 = useGetOneDashboardQuery(id);
  const [updateDashboard, updatePlaylistInfo] = useUpdateDashboardMutation();
  if (Response1.isSuccess) {
    var courses = Response1.data.courses;
    var videos = Response1.data.videos;
    var notes = Response1.data.notes;
    var playlist = Response1.data.playlists;
    var all_notes = Response1.data.all_notes;
    console.log("courses", courses);
    console.log("videos", videos);
    console.log("notes", notes);
    console.log("playlist", playlist);
    console.log("all_notes", all_notes);
    // Separate lists for IDs
    var courseIds = Response1.data.courses.map((course) => course.id);
   
    var videoIds = Response1.data.videos.map((video) => video.id);

    var noteIds = Response1.data.notes.map((note) => note.id);

    var playlistIds = Response1.data.playlists.map((playlist) => playlist.id);

    var allNoteIds = Response1.data.all_notes.map((note) => note.id);
    console.log("courseIds", courseIds);
  }
    const {courseId} = useParams();
    console.log("courseId",courseId)
    const videosResponse = useListAllVideosQuery();
    const filteredVideos = videosResponse.data?.filter(
      (video) => video.course === parseInt(courseId)
    );
    const viewVideo = (videoId) => {
      videoIds.push(videoId);
    updateDashboard(
      {
        id: id,
        courses: courseIds,
        videos: videoIds,
        notes: noteIds,
        playlists: playlistIds,
        all_notes: allNoteIds,
      }
    );
      window.location.href = `view-video/${videoId}`;
    }

    return (
      <>
         <div className="mx-auto my-10">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-3 p-2">
          <Typography variant="h6" color="white">
            All Videos
          </Typography>
        </CardHeader>
        <div className="px-4 pb-4">
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVideos?.map(({ id, title, video_link ,videoNumber,description}) => (
              <Card
                key={id}
                shadow={false}
                className="relative flex flex-col h-[25rem] w-full max-w-[25rem] items-stretch justify-center overflow-hidden text-center rounded-lg p-4 cursor-pointer transition-transform duration-300 transform-gpu hover:scale-105"
                onClick={() => viewVideo(id)}
              >
                 <div className="aspect-w-16 aspect-h-9 mb-4 sm:aspect-none sm:w-full sm:h-48">
  <iframe
    title={title}
    src={video_link}
    allowFullScreen
    className="w-full h-full"
  ></iframe>
</div>

                <CardBody className="flex flex-col justify-between flex-1">
                  <Typography
                    variant="h2"
                    color="blue-gray"
                    className="mb-2 text-lg font-medium line-clamp-2"
                  >
                    {videoNumber +" : "+title}
                  </Typography>
                  <Typography
  variant="h2"
  color="blue-gray"
  className="text-xs font-normal line-clamp-1"
>
  {description}
</Typography>

                  <button className="rounded-md bg-green-500 px-3 py-1.5 text-white text-xs md:text-sm lg:text-base">
                    Watch Now
                  </button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
        
      </>
    );
  }
  

  