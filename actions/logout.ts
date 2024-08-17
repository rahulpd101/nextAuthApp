"use server";
import { signOut } from "@/auth";

export const logout = async () => {
  // some other stuff before logging out
  await signOut();
};
