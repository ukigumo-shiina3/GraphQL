const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    info: string!
  }
`;

const resolvers = {
  Query: {
    info: () => "HackerNews",
  },
};
