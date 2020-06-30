import { ApolloServer, gql } from 'apollo-server-micro'
import typeDefs from '../../server/graphql/typeDefs'
import resolvers from '../../server/graphql/resolvers'
const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })