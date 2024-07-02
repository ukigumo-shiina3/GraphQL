const { ApolloServer, gql } = require("apollo-server");

let links = [
  {
    id: "link-0",
    description: "GraphQLを学ぶ",
    url: "www.graphql.com",
  },
];

const typeDefs = gql`
  type Query {
    info: String!
    feed: [Link]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

const resolvers = {
  Query: {
    info: () => "HackerNews",
    feed: () => links,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`${url}でサーバーを起動中`));
