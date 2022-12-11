import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";

import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: "809770578087-f52smqnrtnij1uuihln1epvuemvnusc3.apps.googleusercontent.com",
      clientSecret: "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",
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
    FacebookProvider({
      clientId: "690350369213848",
      clientSecret: "3d57ebae6c4fc8659ef1404949560723"
    }),
    GitHubProvider({
      clientId: "cb6f43125af5fbf4cb1f",
      clientSecret: "0205f71faa5766de12705647eac31528415699cc"
    })
  ]
});