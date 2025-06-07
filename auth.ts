/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import NextAuth from "next-auth"
import credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@auth/prisma-adapter";
import { saltAndHashPassword } from "@/lib/solvePass";
import prismadb from '@/lib/prismadb'
import { signInSchema } from "./lib/zod";

//@ts-ignore
export const { handlers, signIn, signOut, auth, update } = NextAuth({

  providers: [
    credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
          email:{
              label: 'Email',
              type: 'text',
          },
          password: {
              label: 'Password',
              type: 'password'
          }
      },
      //@ts-ignore
      async authorize(credentials:any){

          if(!credentials?.email || !credentials?.password){
            throw new Error('Email and password required');
          }

          const { email, password } = await signInSchema.parseAsync(credentials)

          const user = await prismadb.user.findUnique({
            where:{
              email: email,
            }
          });

          if(!user || !user.hashedPassword) {
            throw new Error('Email does not exist');
          }

          const isCorrectPassword = await saltAndHashPassword(password,user.hashedPassword)
          
          if(!isCorrectPassword){
            throw new Error('Incorrect password')
          }

          return user;
      }
  }),

  ],
  pages: {
    signIn: `/`,
    newUser: `/`,
    error: '/auth/error',
  },
  callbacks: {
    async redirect({ url, baseUrl }:{url:any,baseUrl:any}) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    jwt({ token ,user, trigger, session }:{token:any,user:any, trigger?:string, session?:any}) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.fullName = user.fullName
        token.memberId = user.memberId
        token.image = user.image
        token.firmName = user.firmName
        token.firmStatus = user.firmStatus
        token.adminStatus = user.adminStatus
        token.conversationId = user.conversationId
      }

      if (trigger === "update" && session) {
        token.fullName = session.fullName ?? token.fullName
        token.username = session.username ?? token.username
        token.image = session.image ?? token.image
        token.firmName = session.firmName ?? token.firmName
        token.firmStatus = session.firmStatus ?? token.firmStatus
        token.adminStatus = session.adminStatus ?? token.adminStatus
        // Eğer başka alanlar varsa buraya ekle!
      }

      return token
    },
    session({ session, token }:{session:any,token:any}) {
      session.user.id = token.id
      session.user.username = token.username
      session.user.fullName = token.fullName
      session.user.image = token.image
      session.user.memberId = token.memberId
      session.user.firmName = token.firmName
      session.user.firmStatus = token.firmStatus
      session.user.adminStatus = token.adminStatus
      session.user.conversationId = token.conversationId
      return session
    },
  },
  debug: process.env.NODE_ENV == 'production',
  trustHost: true,
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: 'jwt',
  },
  jwt:{
    secret: process.env.NEXTAUTH_JWT_SECRET || "UL^BUxub$o#cs9t3340%ru8XH8gh9%BxATgWFwfSK!fOLFki#n",
  }as any,
  secret: process.env.AUTH_SECRET || "tj5oKwQrW14r9MevrF0IrA4TXiF424rEkk8/TyAy5Ls=",
})
