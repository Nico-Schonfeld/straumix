import React from "react";
import HeaderComponent from "./HeaderComponent";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/auth/authJWTOptions";
import { UserSessionType } from "@/types/user/user";
import { getUserID } from "@/app/actions/users/users";

const HeaderContainer = async () => {
  const session = (await getSession()) as UserSessionType;

  if (!session) redirect("/auth/signin");

  const getUserIDRes = await getUserID({ userId: session.user.id });

  return <HeaderComponent user={getUserIDRes} />
  
  
  ;
};

export default HeaderContainer;
