import React from "react";
import FooterComponent from "./FooterComponent";
import { getSession } from "@/utils/auth/authJWTOptions";
import { redirect } from "next/navigation";
import { UserSessionType } from "@/types/user/user";
import { getUserID } from "@/app/actions/users/users";

const FooterContainer = async () => {
  const session = (await getSession()) as UserSessionType;

  if (!session) redirect("/auth/signin");

  const getUserIDRes = await getUserID({ userId: session.user.id });

  return <FooterComponent user={getUserIDRes} />;
};

export default FooterContainer;
