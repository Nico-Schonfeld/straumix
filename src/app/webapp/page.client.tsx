"use client";

import React from "react";
import { Button } from "@/components/ui/button";

import { logoutAuth } from "@/app/actions/auth/loginAuth";
import { UserSessionType } from "@/types/user/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const WebAppClient = ({ session }: { session: UserSessionType }) => {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center">
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <div className="flex items-center gap-2 mb-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={session.user.avatar} />
          <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0">
          <h3 className="text-lg font-bold">@{session.user.username}</h3>
          <p className="text-sm text-gray-500">{session.user.email}</p>
        </div>
      </div>

      <Button onClick={() => logoutAuth()}>Logout</Button>
    </section>
  );
};

export default WebAppClient;
