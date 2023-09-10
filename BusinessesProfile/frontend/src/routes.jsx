import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
  PhotoIcon,
  PlayCircleIcon,
  FolderOpenIcon,
  DocumentCheckIcon,
  EyeSlashIcon,
  PrinterIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp  } from "@/pages/auth";
import SignOut from "./pages/auth/sign-out";
import { ChangePassword } from "@/pages/auth"
import Posts from "./pages/dashboard/posts";
import { AllCourses } from "./pages/coursesNotes/allCourses";
import { Playlists } from "./pages/coursesNotes/playlists";
import { Notes } from "./pages/coursesNotes/notes";
import { getToken } from "./services/LocalStorageService";
import GenNotesPage from "@/pages/coursesNotes/generatenotes";
import { EditProfile } from "./pages/auth/edit-profile";
import { UpdatePost } from "./pages/dashboard/upload-post";
import Chat from "./pages/dashboard/chats";
import Contracts from "./pages/dashboard/contracts";
import BusinessLocatorMap from "./pages/dashboard/b_map";
const icon = {
  className: "w-5 h-5 text-inherit",
};
const { access_token } = getToken();
const authOptions = access_token
  ? [{
    icon: <ArrowLeftOnRectangleIcon {...icon} />,
    name: "sign out",
    path: "/sign-out",
    element: <SignOut />,
  },
  ]
  : [
    {
      icon: <ArrowRightOnRectangleIcon {...icon} />,
      name: "sign in",
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      icon: <UserPlusIcon {...icon} />,
      name: "sign up",
      path: "/sign-up",
      element: <SignUp />,
    },
    ];

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <PhotoIcon {...icon} />,
        name: "Post Job",
        path: "/post_job",
        element: <UpdatePost />,
      },
      {
        icon: <FolderOpenIcon {...icon} />,
        name: "Change Password",
        path: "/change-password",
        element: <EditProfile/>,
      },
      {
        icon: <DocumentCheckIcon {...icon} />,
        name: "edit profile",
        path: "/edit-profile",
        element: <Notes />,
      },
      // <Route path="/generate-notes/" element={<GenNotesPage />} />
      {
        icon: <PrinterIcon {...icon} />,
        name: "Chats ",
        path: "/chats",
        element: <Chat />,
      },
      {
        icon: <PrinterIcon {...icon} />,
        name: "Contracts ",
        path: "/contracts",
        element: <Contracts />,
      },
      {
        icon: <DocumentCheckIcon {...icon} />,
        name: "Business Locator Map",
        path: "/map",
        element: <BusinessLocatorMap />,

      }
      
     
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages:  [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        icon: <ArrowLeftOnRectangleIcon {...icon} />,
        name: "sign out",
        path: "/sign-out",
        element: <SignOut />,
      }
      ],
  },
];

export default routes;
