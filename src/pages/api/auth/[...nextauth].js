import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import mongoDbAdapter from "backend-utils/adapters/customMongodapter";

export const authOptions = {
  // Configure one or more authentication providers
  adapter:mongoDbAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.google_client_id,
      clientSecret: process.env.google_client_secret,
     
    }),
    // ...add more providers here
  ],
 
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.jwt_secret,
  },
  
}

export default NextAuth(authOptions)