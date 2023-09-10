import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import SignOut from "./pages/auth/sign-out";
import { VideoList } from "./pages/coursesNotes/videoList";
import { NotesList } from "./pages/coursesNotes/notesList";
function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      <Route path="/playlists/:playlistId" element={<VideoList />} />
      <Route path="/notes/:notesId" element={<NotesList />} />
      <Route path="/dashboard" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
