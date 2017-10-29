import { GraphQLObjectType } from 'graphql';

import { insertWidgetMutationType as insertWidget } from './insert-widget-mutation-type';
import { deleteWidgetMutationType as deleteWidget } from './delete-widget-mutation-type';

export const mutationType = new GraphQLObjectType({

  name: 'Mutation',

  fields: () => ({
    insertWidget,
    deleteWidget,
  }),

});