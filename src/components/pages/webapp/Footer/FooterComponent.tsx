"use client";

import React from "react";

import {
  Dock,
  DockIcon,
  DockItem,
  DockLabel,
} from "@/components/ui/AnimatedComponents/dock";
import { useRouter, usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HomeIcon,
  LayoutDashboard,
  ScrollText,
  ShoppingCart,
} from "lucide-react";
import { UserSessionType } from "@/types/user/user";

const FooterComponent = ({ session }: { session: UserSessionType }) => {
  const router = useRouter();
  const pathname = usePathname();
  const data = [
    {
      title: "Home",
      icon: (
        <HomeIcon className="h-full w-full text-neutral-600 dark:text-neutral-300" />
      ),
      href: "/webapp",
    },
    {
      title: "Dashboard",
      icon: (
        <LayoutDashboard className="h-full w-full text-neutral-600 dark:text-neutral-300" />
      ),
      href: "/webapp/dashboard",
    },
    {
      title: "Expenses",
      icon: (
        <ShoppingCart className="h-full w-full text-neutral-600 dark:text-neutral-300" />
      ),
      href: "/webapp/expenses",
    },
    {
      title: "History",
      icon: (
        <ScrollText className="h-full w-full text-neutral-600 dark:text-neutral-300" />
      ),
      href: "/webapp/history",
    },
    {
      title: "Profile",
      icon: (
        // <User className="h-full w-full text-neutral-600 dark:text-neutral-300" />
        <Avatar>
          <AvatarImage src={session.user.avatar} />
          <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      ),
      href: "/webapp/profile",
    },
  ];

  const handleClickDock = (href: string) => {
    router.push(href);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0">
      <div className="absolute bottom-5 left-1/2 max-w-full -translate-x-1/2">
        <Dock className="items-end pb-3 border">
          {data.map((item, idx) => (
            <DockItem
              key={idx}
              isActive={pathname === item.href}
              className="aspect-square rounded-full border bg-white dark:bg-black cursor-pointer"
              onClick={() => handleClickDock(item.href)}
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          ))}
        </Dock>
      </div>
    </footer>
  );
};

export default FooterComponent;
