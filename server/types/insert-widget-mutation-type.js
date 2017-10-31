import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId, offsetToCursor } from 'graphql-relay';

import { insertWidgetType } from './widget-input-types';
import { WidgetData } from '../models/widget-data';
import { Viewer, Widget } from '../models/graphql-models';
import { viewerType } from './viewer-type';
import { widgetEdgeType } from '../connections/widgets';

export const insertWidgetMutationType = mutationWithClientMutationId({

  // this is used to prefix the input and payload types that you see in GraphQL
  name: 'InsertWidget',

  inputFields: {
    widget: { type: insertWidgetType },
    // passed by the client to link the client graph operation
    // to the server-side data operation
    clientMutationId: { type: GraphQLString },
  },

  // Steps
  // 1. Mutate - do the data operation
  // 2. Get Payload - produce the response data
  // Arguments
  // 1. Input fields object
  // 2. GraphQL content
  mutateAndGetPayload: ({ widget }, { baseUrl }) => {
    const widgetData = new WidgetData(baseUrl);
    // this return value will popular the first parameter of the output fields
    // resolve functions
    return widgetData.insert(widget).then(widget => Object.assign(new Widget(), widget));

  },

  outputFields: {
    viewer: {
      type: viewerType,
      // first parameter of resolve is the return value of mutateAndGetPayload
      resolve: () => Object.assign(new Viewer(), { id: 1 }),
    },
    widgetEdge: {
      type: widgetEdgeType,
      // first parameter of resolve is the return value of mutateAndGetPayload
      resolve: (widget, _, { baseUrl }) => {

        const widgetData = new WidgetData(baseUrl);
        return widgetData.all().then(widgets => {

          const widgetIndex = widgets.findIndex(w => w.id === widget.id);
          // produce an edge structure with node data and the offset
          return {
            cursor: offsetToCursor(widgetIndex),
            node: widget,
          };
        });
      },
    }
  },

});