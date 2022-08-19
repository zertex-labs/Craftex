import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: SessionUser;
  }

  type SessionUser = {
    id: string;
  } & DefaultSession["user"];
}
