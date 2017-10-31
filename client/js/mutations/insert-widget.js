import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
mutation insertWidgetMutation($input: InsertWidgetInput!) {
  insertWidget(input: $input) {
    viewer {
      id
    }
    widgetEdge {
      cursor
      node {
        __typename
        id
        name
        description
        color
        size
        quantity
      }
    }
  }
}
`;

// performs the actual update to the graph on the client
const sharedUpdater = (source, widgetEdge, viewerId) => {

  const viewerProxy = source.get(viewerId);
  const conn = ConnectionHandler.getConnection(viewerProxy, 'WidgetTable_widgets');
  ConnectionHandler.insertEdgeAfter(conn, widgetEdge);
};

let clientMutationId = 0;

export const insertWidget = (environment, viewerId, widget) => {

  return new Promise((resolve, reject) => {

    commitMutation(environment, {
      mutation,

      // query variables for the mutation defined above
      variables: {
        input: {
          widget,
          clientMutationId: String(clientMutationId++),
        },
      },

      // after the server update is successful, and it updates any nodes
      // added during the optimistic update
      updater: source => {

        const payload = source.getRootField('insertWidget');
        if (!payload) {
          return;
        }
        const widgetEdge = payload.getLinkedRecord('widgetEdge');

        sharedUpdater(source, widgetEdge, viewerId);
      },

      // runs before the server operation, and makes it appear as though the
      // was saved
      optimisticUpdater: source => {

        const nodeId = 'client:newWidget:' + String(clientMutationId++);
        // does not care about the name of the second argument
        const node = source.create(nodeId, 'node');
        node.setValue(nodeId, 'id');
        node.setValue(widget.name, 'name');
        node.setValue(widget.description, 'description');
        node.setValue(widget.color, 'color');
        node.setValue(widget.size, 'size');
        node.setValue(widget.quantity, 'quantity');

        const edgeId = 'client:newEdge:' + String(clientMutationId++);
        // does not care about the name of the second argument
        const widgetEdge = source.create(edgeId, 'widgetEdge');
        widgetEdge.setLinkedRecord(node, 'node');

        sharedUpdater(source, widgetEdge, viewerId);
      },

      // the success function when mutation is successful
      onCompleted: (results, errors) => {
        if (errors) {
          reject(errors);
        }
        resolve(results);
      },

      // the error function when the mutation is unsuccessful
      onError: errors => reject(errors),
    });

  });


};