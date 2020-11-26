import { ApolloServer, gql } from 'apollo-server-express';

export const apolloServer = new ApolloServer({
  typeDefs: gql`
    type Query {
      me: String!
    }
  `,
  resolvers: {
    Query: {
      me: () => 'User',
    },
  },
});
