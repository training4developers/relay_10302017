import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId, fromGlobalId } from 'graphql-relay';

import { viewerType } from './viewer-type';
import { carType } from './car-type';
import { Viewer, Car } from '../models/graphql-models';
import { CarData } from '../models/car-data';

export const deleteCarMutationType = mutationWithClientMutationId({

  name: 'DeleteCar',

  inputFields: {
    carId: { type: GraphQLString },
    clientMutationId: { type: GraphQLString },
  },

  mutateAndGetPayload: ({ carId }, { baseUrl }) => {
    const localCarId = fromGlobalId(carId).id;
    const carData = new CarData(baseUrl);
    return carData.delete(localCarId)
      .then(car => Object.assign(new Car(), car));
  },

  outputFields: {
    viewer: {
      type: viewerType,
      resolve: () => Object.assign(new Viewer(), { id: 1}),
    },
    car: {
      type: carType,
      resolve: car => car,
    }
  },

});