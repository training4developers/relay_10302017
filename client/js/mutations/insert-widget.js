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
  const conn = ConnectionHandler.getConnection(viewerProxy, 'WidgetsTable_widgets');
  ConnectionHandler.insertEdgeAfter(conn, widgetEdge);
};

let clientMutationId = 0;

// function which is being exported, which is the application is going to call
export const insertWidget = (environment, widget, viewerId) => {

  return new Promise((resolve, reject) => {

    // function provided by relay to make the call to the graphql server
    commitMutation(
      environment,
      {
        mutation,
        variables: {
          input: {
            widget,
            clientMutationId: String(clientMutationId++),
          },
        },
        updater: source => {
          const payload = source.getRootField('insertWidget');
          if (!payload) {
            return;
          }
          const widgetEdge = payload.getLinkedRecord('widgetEdge');
          sharedUpdater(source, viewerId, widgetEdge);
        },
        optimisticUpdater: source => {

          console.log(source);

          const nodeId = 'client:newWidget:' + clientMutationId++;
          const node = source.create(nodeId, 'Widget');
          node.setValue(nodeId, 'id');
          node.setValue(widget.name, 'name');
          node.setValue(widget.description, 'description');
          node.setValue(widget.color, 'color');
          node.setValue(widget.size, 'size');
          node.setValue(widget.quantity, 'quantity');

          const widgetEdgeId = 'client:newEdge:' + clientMutationId++;
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
      });

  });

};