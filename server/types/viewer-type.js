import { GraphQLObjectType } from 'graphql';
import {
  globalIdField, connectionArgs, connectionFromArray
} from 'graphql-relay';

import { nodeInterface } from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';

import { Viewer, Widget } from '../models/graphql-models';
import { WidgetData } from '../models/widget-data';

import { widgetsConnectionType } from '../connections/widgets';

export const viewerType = new GraphQLObjectType({

  name: 'Viewer',

  fields: () => ({
    id: globalIdField('Viewer'),
    widgets: {
      type: widgetsConnectionType,
      args: connectionArgs,
      resolve: (_, args, { baseUrl }) => {
        const widgetData = new WidgetData(baseUrl);

        return widgetData.all().then(widgets => {

          const widgetModels = widgets.map(w =>
            Object.assign(new Widget(), w));

          return connectionFromArray(widgetModels, args);
        });
      },
    }
  }),

  interfaces: () => [nodeInterface]

});

registerType(Viewer, viewerType, id =>
  Object.assign(new Viewer(), { id, message: 'Hello World!', }));
