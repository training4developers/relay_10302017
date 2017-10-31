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

const sharedUpdater = (source, viewerId, widgetId) => {
  const viewerProxy = source.get(viewerId);
  const conn = ConnectionHandler.getConnection(viewerProxy, "WidgetTable_widgets");
  ConnectionHandler.deleteNode(conn, widgetId);
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
            widgetId: String(widgetId),
            clientMutationId: String(clientMutationId++),
          },
        },
        updater: source => {
          const payload = source.getRootField('deleteWidget');
          if (!payload) {
            return;
          }
          const widget = payload.getLinkedRecord('widget');
          sharedUpdater(source, viewerId, widget.getValue('id'));
        },
        optimisticUpdater: source => {
          sharedUpdater(source, viewerId, widgetId);
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