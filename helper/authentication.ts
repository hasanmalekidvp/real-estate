/* eslint-disable @typescript-eslint/no-explicit-any */
import * as jose from "jose";
import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export const jwtConfig = {
  secret: new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET),
  expireDate: "1d",
  algo: { alg: "HS256" },
};

export const encodeToken = async (userId: number) => {
  const jws = await new jose.SignJWT({ id: userId })
    .setExpirationTime(jwtConfig.expireDate)
    .setProtectedHeader(jwtConfig.algo)
    .sign(jwtConfig.secret);
  return jws;
};

export const decodeToken = async (token: string) => {
  try {
    const decodeToken = await jose.jwtVerify<{ id: number }>(
      token,
      jwtConfig.secret
    );
    return decodeToken.payload;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const isAuthenticated = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;

  if (!token) return { status: false, message: "Authentication required" };

  const decodedToken = await decodeToken(token);
  if (!decodedToken)
    return { status: false, message: "Authentication required" };
  return {
    status: true,
    message: "Authentication success",
    userId: decodedToken.id,
  };
};

export const getUserInfo = async (req: any) => {
  const auth_status = await isAuthenticated(req);

  if (auth_status.status) {
    const user = await prisma.user.findUnique({
      where: {
        id: auth_status.userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    return user;
  } else {
    return { status: false, message: auth_status?.message };
  }
};
