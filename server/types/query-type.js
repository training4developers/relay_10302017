import { GraphQLObjectType, GraphQLString } from 'graphql';

export const query = new GraphQLObjectType({

  name: 'Query',

  fields: () => ({

    message: {
      type: GraphQLString,
      description: 'A simple message of hope',
      resolve: () => 'Hello World!',
    }


  }),

});