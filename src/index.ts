import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { HiResolvers } from "./resolvers/HiResolvers";
import { UserResolver } from "./resolvers/UserResolver";


(async function main() {

  await createConnection();
  const schema = await buildSchema({
    resolvers: [HiResolvers, UserResolver],
  });
  const server = new ApolloServer({
    schema
  });

  await server.listen(4000);
  console.log("Server has started!");
})();


