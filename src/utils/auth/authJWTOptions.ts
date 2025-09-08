import { UserJWTType } from "@/types/user/user";
import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.NEXT_PRIVATE_KEY_AUTH_ENCODE;
const key = new TextEncoder().encode(secretKey);

interface Payload {
  user: UserJWTType;
  expires: Date;
  [key: string]: unknown; // Add index signature for the string type
}

export async function encrypt(payload: Payload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m") // using "10m" for 10 minutes
    .sign(key);
}

export async function decrypt(input: string): Promise<JWTPayload & Payload> {
  const { payload } = await jwtVerify(input, key, { algorithms: ["HS256"] });
  return payload as JWTPayload & Payload;
}

export async function loginJWT(userData: UserJWTType) {
  const user: UserJWTType = {
    name: userData.name,
    username: userData.username,
    lastName: userData.lastName,
    isActive: userData.isActive,
    createdAt: userData.createdAt,
    updatedAt: userData.updatedAt,
    email: userData.email,
    avatar: "/assets/avatars/avatar_default.svg",
  };

  const expires = new Date(Date.now() + 600 * 1000);
  const session = await encrypt({ user, expires });
  (await cookies()).set("session", session, { expires, httpOnly: true });

  return {
    error: false,
    success: true,
    message: "Successful Login",
    res: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
    },
  };
}

export async function logout() {
  (await cookies()).set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  if (!session) return null;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 600 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed as Payload),
    httpOnly: true,
    expires: parsed.expires,
  });

  return res;
}
