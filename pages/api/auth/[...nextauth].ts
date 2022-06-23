import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import prisma from "../../../lib/prisma"
import CustomNextAuthAdapter from "../../../lib/CustomNextAuthAdapter"

export default NextAuth({
  adapter: CustomNextAuthAdapter(prisma),

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const prismaUser = await prisma.user.findFirst({
        where: {
          id: user.id
        }
      });

      console.log('user', prismaUser);

      return true;
    },
    async session({ session, token, user }) {
      session.user.id = user.id;
      
      return session;
    },
  },
})