import React from "react";
import { InlineIcon } from '@iconify/react';

export const SidebarData = [
  {
    title: "Dashboard",
    path: "",
    icon: <InlineIcon icon="ant-design:home-filled" />,
  },
  {
    title: "Employee",
    path: "employeelist",
    icon: <InlineIcon icon="clarity:employee-group-solid"/>,
  },
  {
    title: "CVSeeker",
    path: "cvseekerlist",
    icon: <InlineIcon icon="mdi:user-group"/>,
  },
  {
    title: "Feedback",
    path: "feedbacklist",
    icon: <InlineIcon icon="ic:baseline-feedback"/>,
  },
  {
    title: "Slideshow",
    path: "slideshowlist",
    icon: <InlineIcon icon="ri:slideshow-fill"/>,
  },
  {
    title: "Log out",
    path: "/login",
    icon: <InlineIcon icon="bx:log-out" />,
  },
];
