import { GraphQLObjectType } from 'graphql';
import { globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay';

import { widgetConnectionType } from '../connections/widgets';
import { WidgetData } from '../models/widget-data';
import { Widget, Viewer } from '../models/graphql-models';
import { nodeInterface } from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';

export const viewerType = new GraphQLObjectType({

  name: 'Viewer',
  description: 'User of the application',
  fields: () => ({
    id: globalIdField('Viewer'),
    widgets: {
      type: widgetConnectionType,
      description: 'get all of the widgets',
      args: connectionArgs,
      resolve: (_, args, { baseUrl }) => {
        const widgetData = new WidgetData(baseUrl);
        return widgetData.all().then(widgets => {
          const widgetModels = widgets.map(w => Object.assign(new Widget(), w));
          return connectionFromArray(widgetModels, args);
        });
      },
    },
  }),

  interfaces: () => [ nodeInterface ],

});

registerType(Viewer, viewerType, id => {
  return Object.assign(new Viewer(), { id });
});