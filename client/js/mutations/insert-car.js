import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

/* is this needed */
const mutation = graphql`
mutation insertCarMutation($input: InsertCarInput!) {
  insertCar(input: $input) {
    viewer {
      id
      cars {
        totalCount
      }
    }
    carEdge {
      cursor
      node {
        id
        make
        model
        year
        color
        price
      }
    }
  }
}
`;

// performs the actual update to the graph on the client
const sharedUpdater = (source, carEdge, viewerId, totalCount) => {

  const viewerProxy = source.get(viewerId);
  const conn = ConnectionHandler.getConnection(viewerProxy, 'CarTable_cars');
  ConnectionHandler.insertEdgeAfter(conn, carEdge);

  // update the total count
  if (!totalCount) {
    totalCount = conn.getValue('totalCount') + 1;
  }
  conn.setValue(totalCount, 'totalCount');
};

let clientMutationId = 0;

export const insertCar = (environment, viewerId, car) => {

  return new Promise((resolve, reject) => {

    commitMutation(environment, {
      mutation,

      // query variables for the mutation defined above
      variables: {
        input: {
          car,
          clientMutationId: String(clientMutationId++),
        },
      },

      // after the server update is successful, and it updates any nodes
      // added during the optimistic update
      updater: source => {

        const payload = source.getRootField('insertCar');
        if (!payload) {
          return;
        }
        const carEdge = payload.getLinkedRecord('carEdge');
        const totalCount = payload.getLinkedRecord('viewer')
          .getLinkedRecord('cars').getValue('totalCount');

        sharedUpdater(source, carEdge, viewerId, totalCount);
      },

      // runs before the server operation, and makes it appear as though the
      // was saved
      optimisticUpdater: source => {

        const nodeId = 'client:newCar:' + String(clientMutationId++);
        // does not care about the name of the second argument
        const node = source.create(nodeId, 'node');
        node.setValue(nodeId, 'id');
        node.setValue(car.make, 'make');
        node.setValue(car.model, 'model');
        node.setValue(car.year, 'year');
        node.setValue(car.color, 'color');
        node.setValue(car.price, 'price');

        const edgeId = 'client:newEdge:' + String(clientMutationId++);
        // does not care about the name of the second argument
        const carEdge = source.create(edgeId, 'carEdge');
        carEdge.setLinkedRecord(node, 'node');

        sharedUpdater(source, carEdge, viewerId);
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