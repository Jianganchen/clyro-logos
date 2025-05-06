"use client";

import * as React from "react";
import { Settings2, SquareTerminal, Images } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Logo } from "./logo";
import { useUser } from "@clerk/clerk-react";

const data = {
  navMain: [
    {
      name: "Playground",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      name: "Gallery",
      url: "/dashboard/gallery",
      icon: Images,
      isActive: false,
    },

    {
      name: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      isActive: false,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const navUser = {
    name: user.fullName as string,
    email: user.emailAddresses[0].emailAddress,
    avatar: user.imageUrl,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar text-sidebar-primary-foreground">
                  <Logo className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Clyro Logo</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
