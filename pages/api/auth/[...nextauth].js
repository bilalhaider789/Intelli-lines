import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";

import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET
    })
  ]
});