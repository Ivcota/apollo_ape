import express from "express";
import { ApolloServer } from "apollo-server-express";
import { IContext, resolvers, typeDefs } from "./schemaResolver";
import { MusicAPI } from "./datasource";

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        musicApi: new MusicAPI(),
      };
    },
  });
  const PORT = 5000;

  await server.start();

  const app = express();

  // Add express as middleware for Apollo Server
  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen(PORT, resolve as any));
  console.log(
    `
    🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}
    🚄 Express Server listening on PORT: ${PORT}
  `
  );

  return { server, app };
}

startApolloServer();
