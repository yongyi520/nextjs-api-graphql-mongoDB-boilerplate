import { ApolloServer, gql } from "apollo-server-micro";
import Cors from "micro-cors";
import typeDefs from "../../server/graphql/typeDefs";
import resolvers from "../../server/graphql/resolvers";
const apolloServer = new ApolloServer({ typeDefs, resolvers });

const cors = Cors()

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export default cors(handler)
// export default cors((req, res) => req.method === 'OPTIONS' ? res.end() : handler(req, res))
// export default cors((req, res) => {
//   if (req.method === 'OPTIONS') {
//     return send(res, 200, 'ok!');
//   }

//   if (req.method !== 'POST') {
//     throw createError(404, 'Not Found');
//   }
//   return handler(req, res)
//   // req.method === "OPTIONS" ? res.end() : handler(req, res)
// });
