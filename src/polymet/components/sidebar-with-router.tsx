import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  PhoneIcon,
  SettingsIcon,
  HelpCircleIcon,
  FileTextIcon,
  ZapIcon,
  PlusIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SidebarWithRouter() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      name: "AI Agents",
      href: "/agents",
      icon: ZapIcon,
    },
    {
      name: "Call History",
      href: "/calls",
      icon: PhoneIcon,
    },
  ];

  const secondaryNavItems = [
    {
      name: "Settings",
      href: "/settings",
      icon: SettingsIcon,
    },
    {
      name: "Help Center",
      href: "/help",
      icon: HelpCircleIcon,
    },
    {
      name: "Documentation",
      href: "/docs",
      icon: FileTextIcon,
    },
  ];

  // Define the gradient color for the logo and icons
  const logoGradientClass =
    "text-transparent bg-clip-text bg-gradient-to-b from-[#2E8B57] to-[#7FFF00]";
  const iconGradientClass = "text-[#2E8B57]";

  return (
    <div className="flex h-full flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
          <ZapIcon className={`h-6 w-6 ${iconGradientClass}`} />

          <span className="text-lg">VoiceGenius</span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-auto py-2 font-thin">
        <div className="px-3 py-2">
          <Link to="/create-agent">
            <Button className="w-full justify-start gap-2">
              <PlusIcon className="h-4 w-4" />
              Create New Agent
            </Button>
          </Link>
        </div>
        <nav className="grid gap-1 px-2 group-[.active]:bg-accent">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                currentPath === item.href
                  ? "bg-accent text-accent-foreground"
                  : "transparent"
              )}
            >
              <item.icon
                className={`h-4 w-4 ${currentPath === item.href ? "" : iconGradientClass}`}
              />

              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex-1"></div>
      </div>
      <nav className="grid gap-1 px-2 mb-4">
        {secondaryNavItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              currentPath === item.href
                ? "bg-accent text-accent-foreground"
                : "transparent"
            )}
          >
            <item.icon
              className={`h-4 w-4 ${currentPath === item.href ? "" : iconGradientClass}`}
            />

            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <div className="rounded-lg bg-muted p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Pro Plan</p>
              <p className="text-xs text-muted-foreground">7 days remaining</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="mt-2 w-full">
            Upgrade Plan
          </Button>
        </div>
      </div>
    </div>
  );
}
