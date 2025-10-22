"use client";

import { AppLabel } from "@/client/components/app-label";
import { NavHistory } from "@/client/components/nav-history";
import { NavUser } from "@/client/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/client/components/sidebar";
import { BotMessageSquare } from "lucide-react";
import * as React from "react";

// This is sample data.
const data = {
  user: {
    name: "Anonymous",
    avatar: "/avatars/shadcn.jpg"
  },
  teams: [
    {
      name: "AInme",
      logo: BotMessageSquare,
      plan: "Chat with Anime"
    }
  ],
  history: [
    {
      name: "Design Engineering",
      url: "#"
    },
    {
      name: "Sales & Marketing",
      url: "#"
    },
    {
      name: "Travel",
      url: "#"
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppLabel teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavHistory history={data.history} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
