import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./graphql/schema/schema";
import { connectDB } from "./database/database";

dotenv.config();

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";

const port = Number(process.env.PORT) || 3000;

const mongoURI = process.env.MONGO_URI!;

connectDB(mongoURI);

//this is basically schema
const typeDefs = ` 
   ${schema}
`;

//acutal logic will be in resolver
const resolvers = {
  Query: {
    greetings: () => "Namaste!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
  listen: { port },
})
  .then(() => {
    console.log(`Server is working on Port: ${port} in ${envMode} Mode.`);
  })
  .catch((err) => {
    console.error("Error starting the server:", err);
  });
