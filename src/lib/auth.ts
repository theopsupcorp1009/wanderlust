import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"

const mongodbUrl = process.env.MONGODB_URL as string;

if (!mongodbUrl) {
  throw new Error("MONGODB_URL is missing from environment variables");
}

const client = new MongoClient(mongodbUrl);
const db = client.db("wanderlust-db");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
   emailAndPassword: { 
    enabled: true, 
  },
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    plugins: [
        jwt(), 
    ],
    session: {
      cookieCache: {
        enabled: true,
        strategy: 'jwt',
        maxAge: 7*24*60*60,
      },
    },
});