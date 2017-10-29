import { connectionDefinitions } from 'graphql-relay';

import { widgetType } from '../types/widget-type';

export const {
  connectionType: widgetsConnectionType,
  edgeType: widgetsEdgeType,
} = connectionDefinitions({
  name: 'Widgets',
  nodeType: widgetType,
});

// const connObj = connectionDefinitions({
//   name: 'Widgets',
//   nodeType: widgetType,
// });

// export const widgetsConnectionType = connObj.connectionType;
// export const widgetsEdgeType = connObj.edgeType;