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
import ContractPages from "./pages/dashboard/contracts";
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
        name: "Jobs",
        path: "/posts",
        element: <Posts />,
      },

      {
        icon: <PlayCircleIcon {...icon} />,
        name: "change password",
        path: "/change_password",
        element: <ChangePassword/>,
      },
      {
        icon: <DocumentCheckIcon {...icon} />,
        name: "edit profile",
        path: "/edit_profile",
        element: <EditProfile/>,
      },
      {
        icon: <DocumentCheckIcon {...icon} />,
        name: "Chats and Contracts",
        path: "/chats_contracts",
        element: <ContractPages/>,
      },
     
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
