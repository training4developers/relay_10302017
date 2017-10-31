import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';

import { viewerType } from './viewer-type';
import { widgetType } from './widget-type';
import { Viewer, Widget } from '../models/graphql-models';
import { WidgetData } from '../models/widget-data';

export const deleteWidgetMutationType = mutationWithClientMutationId({

  name: 'DeleteWidget',

  inputFields: {
    widgetId: { type: GraphQLString },
    clientMutationId: { type: GraphQLString },
  },

  mutateAndGetPayload: ({ widgetId }, { baseUrl }) => {
    const localWidgetId = fromGlobalId(widgetId).id;
    const widgetData = new WidgetData(baseUrl);
    return widgetData.delete(localWidgetId)
      .then(widget => Object.assign(new Widget(), widget));
  },

  outputFields: {
    viewer: {
      type: viewerType,
      resolve: () => Object.assign(new Viewer(), { id: 1}),
    },
    widget: {
      type: widgetType,
      resolve: widget => widget,
    }
  },

});