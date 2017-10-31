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
  const conn = ConnectionHandler.getConnection(viewerProxy, 'WidgetTable_widgets');
  ConnectionHandler.deleteNode(conn, widgetId);
};

let clientMutationId = 0;

export const deleteWidget = (environment, viewerId, widgetId) => {

  return new Promise((resolve, reject) => {
    
    commitMutation(
      environment,
      {
        mutation,
        variables: {
          input: {
            widgetId,
            clientMutationId: String(clientMutationId++),
          },
        },
        updater: source => {
          const payload = source.getRootField('deleteWidget');
          if (!payload) {
            return;
          }
          const deletedWidget = payload.getLinkedRecord('widget');
          sharedUpdater(source, viewerId, deletedWidget.getValue('id'));
        },
        optimisticUpdater: source => {
          sharedUpdater(source, viewerId, widgetId);
        },
        onCompleted: (results, errors) => {
          if (errors) {
            reject(errors);
            return;
          }
          resolve(results);
        },
        onError: errors => reject(errors),
      }
    );

    
  });


};
