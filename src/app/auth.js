import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { compare } from "bcryptjs";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const email = credentials.email;
        const password = credentials.password;

        if (!email || !password) {
          throw new Error("Please provide email and password.")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: email
          }
        });

        // if (user && user.role === 'admin') {
        //   // User is an admin
        //   console.log('User is an admin');
        // } else {
        //   // User is not an admin
        //   console.log('User is not an admin');
        // }

        if (!user) {
          throw new Error("Invalid user.")
        }

        const isPasswordValid = await compare(
          password,
          user.password
        );

        if(!isPasswordValid) {
          throw new Error("Invalid Password.")
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  }, 
})