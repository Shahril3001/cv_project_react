import React from "react";
import { InlineIcon } from '@iconify/react';
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Dashboard",
    path: "",
    icon: <InlineIcon icon="ant-design:home-filled" />,
  },
  {
    title: "Management",
    icon: <InlineIcon icon="material-symbols:account-box" />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Profile",
        path: "userprofile",
        icon: <InlineIcon icon="healthicons:ui-user-profile" />,
      },
      {
        title: "Work Experience",
        path: "worklist",
        icon: <InlineIcon icon="material-symbols:work" />,
      },
      {
        title: "Education",
        path: "educationlist",
        icon: <InlineIcon icon="zondicons:education" />,
      },
      {
        title: "Skill",
        path: "skilllist",
        icon: <InlineIcon icon="bi:tools" />,
      },
      {
        title: "Language",
        path: "languagelist",
        icon: <InlineIcon icon="fa-solid:language" />,
      },
      {
        title: "Hobby",
        path: "hobbylist",
        icon: <InlineIcon icon="game-icons:achievement" />,
      },
    ],

  },
  {
    title: "Contact",
    path: "contactseeker",
    icon: <InlineIcon icon="ic:round-contact-support" />,
  },
  {
    title: "Log out",
    path: "/login",
    icon: <InlineIcon icon="bx:log-out" />,
  },
];
