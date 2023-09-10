import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: "python",
    title: "Total minute learned",
    value: "53 minutes",
   
      FooterColor: "text-green-500",
      FooterValue: "20%",
      FooterLabel: "Python completed",
   
  },
  {
    color: "pink",
    icon: "fa-brands fa-js fa-2xl text-white",
    title: "Total hour learned",
    value: "3 hours",
    footer: {
      color: "text-green-500",
      value: "30%",
      label: "Java Script completed",
    },
  },
  {
    color: "green",
    icon: "fa-brands fa-java fa-2xl text-white",
    title: "Total hour learned",
    value: "2 hours",
    footer: {
      color: "text-green-500",
      value: "20%",
      label: "Java completed",
    },
  },
  {
    color: "orange",
    icon: "fa-brands fa-c fa-2xl text-white",
    title: " Total hour learned",
    value: "1 hour",
    footer: {
      color: "text-green-500",
      value: "50%",
      label: "C language completed",
    },
  },
];

export default statisticsCardsData;
