import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation insertWidgetMutation($input: InsertWidgetInput!) {
    insertWidget(input: $input) {
      viewer {
        id
      }
      widgetEdge {
        node {
          __typename
          id
          name
          description
          color
          size
          quantity
        }
        cursor
      }
    }
  }
`;

const sharedUpdater = (source, viewerId, widgetEdge) => {
  const viewerProxy = source.get(viewerId);
  const conn = ConnectionHandler.getConnection(viewerProxy, 'WidgetTable_widgets');
  ConnectionHandler.insertEdgeAfter(conn, widgetEdge);
};

let clientMutationId = 0;

export const insertWidget = (environment, widget, viewerId) => {

  return new Promise((resolve, reject) => {

    commitMutation(
      environment,
      {
        variables: {
          input: {
            widget,
            clientMutationId: String(clientMutationId++),
          },
        },
        mutation,
        updater: source => {

          const payload = source.getRootField('insertWidget');
          if (!payload) {
            return;
          }

          const widgetEdge = payload.getLinkedRecord('widgetEdge');
          sharedUpdater(source, viewerId, widgetEdge);
        },
        optimisticUpdater: source => {

          const nodeId = 'client:newWidget:' + String(clientMutationId++);
          const node = source.create(nodeId, 'Widget');
          node.setValue(nodeId, 'id');
          node.setValue(widget.name, 'name');
          node.setValue(widget.description, 'description');
          node.setValue(widget.color, 'color');
          node.setValue(widget.size, 'size');
          node.setValue(widget.quantity, 'quantity');

          const widgetEdgeId = 'client:newEdge:' + String(clientMutationId++);
          const widgetEdge = source.create(widgetEdgeId, 'widgetEdge');
          widgetEdge.setLinkedRecord(node, 'node');
          
          sharedUpdater(source, viewerId, widgetEdge);
        },
        onCompleted: (result, errors) => {
          if (errors) {
            reject(errors);
          }
          resolve(result);
        },
        onError: err => reject(err),
      }
    );


  });

};