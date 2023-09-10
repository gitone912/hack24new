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
import { useListAllnotesQuery } from "@/services/courseServiceApi";
import { useListAllPlaylistsQuery } from "@/services/courseServiceApi";
import { useUpdateDashboardMutation } from "@/services/courseServiceApi";
import { useGetOneDashboardQuery } from "@/services/courseServiceApi";
import { getId } from "@/services/LocalStorageService";

export function Notes() {
  const Response = useListAllnotesQuery();
  const res = Response.data;

  const handleClick = (NotesId) => {
    window.location.href = `/notes/${NotesId}`;
  };

  const id = getId();
  const Response1 = useGetOneDashboardQuery(id);

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
  const [updateDashboard, updatePlaylistInfo] = useUpdateDashboardMutation();

  const handleUpdatePlaylist = (notesId) => {
    noteIds.push(notesId);
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
    if(updatePlaylistInfo.isSuccess){
      window.location.href = `/dashboard`;
    }
  };

  return (
    <div className="mx-auto my-10">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-5 p-3">
          <Typography variant="h6" color="white">
            Notes
          </Typography>
        </CardHeader>
        <div className="px-4 pb-4">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            All Notes
          </Typography>
          <Typography
            variant="small"
            className="font-normal text-blue-gray-500"
          >
            latest notes
          </Typography>
          <div className="mt-6 grid grid-cols-2 gap-12 md:grid-cols-3 xl:grid-cols-4">
            {res?.map(({ id, title, content ,image_link}) => (
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

                <CardBody className="relative ">
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
                    {content}
                  </Typography>
                  <button
                    onClick={() => handleClick(id)}
                    className="mt-2 rounded-md bg-blue-500 px-3 py-1.5 text-white text-xs md:text-sm lg:text-sm"
                  >
                    View Notes
                  </button>
                  <button
                    onClick={() => handleUpdatePlaylist(id)}
                    className="mt-2 rounded-md bg-green-500 px-3 py-1.5 text-white text-xs md:text-sm lg:text-sm"
                  >
                    Add to Dashboard
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