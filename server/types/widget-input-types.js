import { GraphQLInputObjectType, GraphQLString, GraphQLInt } from 'graphql';

const fields = () => ({
  name: { type: GraphQLString },
  description: { type: GraphQLString },
  color: { type: GraphQLString },
  size: { type: GraphQLString },
  quantity: { type: GraphQLInt },
});

export const insertWidgetType = new GraphQLInputObjectType({
  name: 'InsertWidget',
  fields,
});

export const updateWidgetType = new GraphQLInputObjectType({
  name: 'UpdateWidget',
  fields: () => Object.assign(fields(), { id: { type: GraphQLString } }),
});