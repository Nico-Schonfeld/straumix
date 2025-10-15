import React from "react";
import ChartsClient from "./page.client";
import { isMaintenance } from "@/utils/mantenance";
import Maintenance from "@/components/pages/Mantenance/Mantenance";
import { getSession } from "@/utils/auth/authJWTOptions";
import { redirect } from "next/navigation";
import { UserSessionType } from "@/types/user/user";
import { getUserExpenseData } from "@/app/actions/expense/expenseActions";
import { getUserID } from "@/app/actions/users/users";

const ChartsPage = async () => {
  const session = (await getSession()) as UserSessionType;

  if (isMaintenance) {
    return <Maintenance />;
  }

  if (!session) redirect("/auth/signin");

  // Obtener datos de gastos del usuario
  const expenseDataResult = await getUserExpenseData();
  const getUserIDRes = await getUserID({ userId: session.user.id });

  return (
    <ChartsClient
      user={getUserIDRes}
      initialExpenseData={
        expenseDataResult.success && expenseDataResult.data
          ? expenseDataResult.data
          : null
      }
      hasExpenseData={expenseDataResult.success}
    />
  );
};

export default ChartsPage;
