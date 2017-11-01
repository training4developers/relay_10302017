import { GraphQLInt } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';

import { carType } from '../types/car-type';

export const {
  connectionType: carConnectionType,
  edgeType: carEdgeType
} = connectionDefinitions({
  
  name: 'Cars',
  nodeType: carType,

  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
    },
  }),

});