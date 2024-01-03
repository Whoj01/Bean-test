import { sign, verify } from "jsonwebtoken";
import { OutputUser } from "../models/User";

export function signToken(payload: Omit<OutputUser, 'token'>, time: string | number) {
  return sign({ payload }, process.env.JWT_SECRET! satisfies string, { expiresIn: time });
}

export function verifyToken(token: any) {
  return verify(token, process.env.JWT_SECRET! satisfies string );
}