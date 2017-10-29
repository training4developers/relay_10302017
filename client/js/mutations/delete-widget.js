import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation deleteWidgetMutation($input: DeleteWidgetInput!) {
    deleteWidget(input: $input) {
      viewer {
        id
      }
      widget {
        id
        name
        description
        color
        size
        quantity
      }
    }
  }
`;


const sharedUpdater = (source, viewerId, deleteWidgetId) => {

  const viewerProxy = source.get(viewerId);
  const conn = ConnectionHandler.getConnection(viewerProxy, 'WidgetsTable_widgets');
  ConnectionHandler.deleteNode(conn, deleteWidgetId);
};


let clientMutationId = 0;

export const deleteWidget = (environment, widgetId, viewerId) => {

  return new Promise((resolve, reject) => {

    commitMutation(
      environment,
      {
        mutation,
        variables: {
          input: {
            widgetId,
            clientMutationId: String(clientMutationId++),
          }
        },
        updater: source => {
          const payload = source.getRootField('deleteWidget');
          const widget = payload.getLinkedRecord('widget');
          sharedUpdater(source, viewerId, widget.getValue('id'));
        },
        optimisticUpdater: source => {
          sharedUpdater(source, viewerId, widgetId);
        },
        onCompleted: res => resolve(res),
        onError: err => reject(err),
      });

  });

};