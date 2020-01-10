const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

// Import your resolvers here from ./resolvers

const resolvers = {

}

const server = new GraphQLServer({
	typeDefs: './schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma,
  }),
})

server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))