import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // Your API server URL
});

export type User = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Session = {
  id: string;
  expiresAt: Date;
};

export type AuthSession = {
  user: User;
  session: Session;
} | null;
