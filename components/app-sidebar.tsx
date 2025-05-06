import * as React from "react";

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
import { currentUser } from "@clerk/nextjs/server";

const data = {
  navMain: [
    {
      name: "Playground",
      url: "/dashboard",
      icon: "icon-square-terminal",
      isActive: true,
    },
    {
      name: "Gallery",
      url: "/dashboard/gallery",
      icon: "icon-images",
      isActive: false,
    },
    {
      name: "Settings",
      url: "/dashboard/settings",
      icon: "icon-settings2",
      isActive: false,
    },
  ],
};

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = await currentUser();

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
