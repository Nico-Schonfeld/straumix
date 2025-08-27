import { NextRequest } from "next/server";
import { updateSession } from "@/utils/auth/auth-jwt-options";

export async function middleware(req: NextRequest) {
  return await updateSession(req);
}
