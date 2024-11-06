import React from "react";
import { InlineIcon } from '@iconify/react';
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <InlineIcon icon="ant-design:home-filled" />,
  },
  {
    title: "About",
    path: "about",
    icon: <InlineIcon icon="mdi:about" />,
  },
  {
    title: "Account",
    icon: <InlineIcon icon="material-symbols:account-box" />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Login",
        path: "login",
        icon: <InlineIcon icon="bx:log-in" />,
      },
      {
        title: "Sign Up",
        path: "register",
        icon: <InlineIcon icon="mdi:register" />,
      },
    ],

  },
  {
    title: "Contact",
    path: "contact",
    icon: <InlineIcon icon="ic:round-contact-support" />,
  },
];
