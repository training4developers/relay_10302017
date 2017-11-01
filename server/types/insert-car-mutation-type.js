import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId, offsetToCursor } from 'graphql-relay';

import { insertCarType } from './car-input-types';
import { CarData } from '../models/car-data';
import { Viewer, Car } from '../models/graphql-models';
import { viewerType } from './viewer-type';
import { carEdgeType } from '../connections/cars';

export const insertCarMutationType = mutationWithClientMutationId({

  // this is used to prefix the input and payload types that you see in GraphQL
  name: 'InsertCar',

  inputFields: {
    car: { type: insertCarType },
    // passed by the client to link the client graph operation
    // to the server-side data operation
    clientMutationId: { type: GraphQLString },
  },

  // Steps
  // 1. Mutate - do the data operation
  // 2. Get Payload - produce the response data
  // Arguments
  // 1. Input fields object
  // 2. GraphQL content
  mutateAndGetPayload: ({ car }, { baseUrl }) => {
    const carData = new CarData(baseUrl);
    // this return value will popular the first parameter of the output fields
    // resolve functions
    return carData.insert(car).then(car => Object.assign(new Car(), car));

  },

  outputFields: {
    viewer: {
      type: viewerType,
      // first parameter of resolve is the return value of mutateAndGetPayload
      resolve: () => Object.assign(new Viewer(), { id: 1 }),
    },
    carEdge: {
      type: carEdgeType,
      // first parameter of resolve is the return value of mutateAndGetPayload
      resolve: (car, _, { baseUrl }) => {

        const carData = new CarData(baseUrl);
        return carData.all().then(cars => {

          const carIndex = cars.findIndex(w => w.id === car.id);
          // produce an edge structure with node data and the offset
          return {
            cursor: offsetToCursor(carIndex),
            node: car,
          };
        });
      },
    }
  },

});