import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { randomBytes } from "crypto";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      await dbConnect();
      const existingUser = await User.findOne({ email: user.email });

      if (existingUser) {
        if (account?.provider && existingUser.provider !== account.provider) {
          return "/register?auth_error=provider_mismatch";
        }

        if (!existingUser.provider && account?.provider) {
          existingUser.provider = account.provider as typeof existingUser.provider;
          await existingUser.save();
        }

        return true;
      }

      const provider = account?.provider ?? "google";
      if (provider !== "google") {
        return "/register?auth_error=provider_not_supported";
      }

      // Generate userId: starts with "CW-U" + 6 random alphanumeric chars (total 10 chars)
      const randomPart = randomBytes(3).toString('hex').toUpperCase(); // 6 chars
      const userId = `CW-U${randomPart}`;

      await User.create({
        userId,
        name: user.name,
        email: user.email,
        provider,
        role: "user", // default role
      });

      return true;
    },
    async session({ session }) {
      await dbConnect();
      const dbUser = await User.findOne({ email: session.user?.email });
      if (dbUser) {
        (session.user as any).id = dbUser._id.toString();
        (session.user as any).role = dbUser.role;
        (session.user as any).provider = dbUser.provider;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
