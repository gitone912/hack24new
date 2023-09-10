import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { EditProfile } from "@/pages/auth/edit-profile";
import { UpdatePost } from "@/pages/dashboard/upload-post";
import { ViewPost } from "@/pages/dashboard/viewOnePost";
import { ViewVideo } from "@/pages/coursesNotes/viewOneVideo";
import { AllVideos } from "@/pages/coursesNotes/all_videos";
import { ChangePassword } from "@/pages/auth";
import { getToken } from "@/services/LocalStorageService";
import Error404 from "@/pages/NoAuth404";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const { access_token } = getToken();


  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
          <Route path="/edit-profile/" element={access_token ? <EditProfile/> : <Navigate to="/dashboard/error-404" />} />
          <Route path="/upload-post/" element={access_token ? <UpdatePost/> : <Navigate to="/dashboard/error-404" />} />
          <Route path="/view-post/:postId" element={<ViewPost />} />
          <Route path="/courses/:courseId" element={<AllVideos />} />
          <Route path="courses/view-video/:videoId" element={<ViewVideo />} />
          <Route path="/change-password/" element={access_token ? <ChangePassword/> : <Navigate to="/dashboard/error-404" />} />
          
          <Route path="/error-404" element={<Error404 />} />
         
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
