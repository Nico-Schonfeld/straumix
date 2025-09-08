import React from "react";
import FooterComponent from "./FooterComponent";
import { getSession } from "@/utils/auth/authJWTOptions";
import { redirect } from "next/navigation";
import { UserSessionType } from "@/types/user/user";

const FooterContainer = async () => {
  const session = (await getSession()) as UserSessionType;

  if (!session) redirect("/auth/signin");

  return <FooterComponent session={session} />;
};

export default FooterContainer;
