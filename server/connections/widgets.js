import { GraphQLInt } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';

import { widgetType } from '../types/widget-type';

export const {
  connectionType: widgetConnectionType,
  edgeType: widgetEdgeType
} = connectionDefinitions({
  
  name: 'Widgets',
  nodeType: widgetType,

  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
    },
  }),

});