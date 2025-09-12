import React from "react";
import WebAppClient from "./page.client";
import Maintenance from "@/components/pages/Mantenance/Mantenance";
import { isMaintenance } from "@/utils/mantenance";
import { getSession } from "@/utils/auth/authJWTOptions";
import { redirect } from "next/navigation";
import { UserSessionType } from "@/types/user/user";
import { getUserExpenseData } from "@/app/actions/expense/expenseActions";
import { getUserID } from "../actions/users/users";

const WebApp = async () => {
  const session = (await getSession()) as UserSessionType;

  if (isMaintenance) {
    return <Maintenance />;
  }

  if (!session) redirect("/auth/signin");

  // Obtener datos de gastos del usuario
  const expenseDataResult = await getUserExpenseData();

  const getUserIDRes = await getUserID({ userId: session.user.id });

  // const getAllUsersRes = await getAllUsers();

  return (
    <>
      <WebAppClient
        user={getUserIDRes}
        initialExpenseData={
          expenseDataResult.success && expenseDataResult.data
            ? expenseDataResult.data
            : null
        }
        hasExpenseData={expenseDataResult.success}
      />
    </>
  );
};

export default WebApp;
