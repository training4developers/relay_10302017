import { GraphQLObjectType, GraphQLString } from 'graphql';

export const query = new GraphQLObjectType({

  name: 'Query',

  fields: () => ({
    message: {
      type: GraphQLString,
      resolve: () => 'Hello World!',
    }
  }),

});