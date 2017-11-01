import { GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLFloat } from 'graphql';

const fields = () => ({
  make: { type: GraphQLString },
  model: { type: GraphQLString },
  year: { type: GraphQLInt },
  color: { type: GraphQLString },
  price: { type: GraphQLFloat },
});

export const insertCarType = new GraphQLInputObjectType({
  name: 'InsertCar',
  fields,
});

export const updateCarType = new GraphQLInputObjectType({
  name: 'UpdateCar',
  fields: () => Object.assign(fields(), { id: { type: GraphQLString } }),
});