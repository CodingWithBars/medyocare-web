import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Next.js App Router requires named exports for HTTP methods
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
