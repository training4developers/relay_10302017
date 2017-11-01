import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay';

import { widgetConnectionType } from '../connections/widgets';
import { carConnectionType } from '../connections/cars';
import { WidgetData } from '../models/widget-data';
import { CarData } from '../models/car-data';
import { Widget, Viewer, Car } from '../models/graphql-models';
import { nodeInterface } from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';
import { widgetType } from './widget-type';

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
          const conn = connectionFromArray(widgetModels, args);
          conn.totalCount = widgetModels.length;
          return conn;
        });
      },
    },
    widget: {
      type: widgetType,
      description: 'get one widgets',
      args: {
        widgetId: {
          type: GraphQLString
        }
      },
      resolve: (_, { widgetId }, { baseUrl }) => {
        const widgetData = new WidgetData(baseUrl);
        return widgetData.one(widgetId);
      },
    },
    cars: {
      type: carConnectionType,
      description: 'get all of the cars',
      args: connectionArgs,
      resolve: (_, args, { baseUrl }) => {
        const carData = new CarData(baseUrl);
        return carData.all().then(cars => {
          const carModels = cars.map(c => Object.assign(new Car(), c));
          const conn = connectionFromArray(carModels, args);
          conn.totalCount = carModels.length;
          return conn;

        });
      },
    },
  }),

  interfaces: () => [ nodeInterface ],

});

registerType(Viewer, viewerType, id => {
  return Object.assign(new Viewer(), { id });
});