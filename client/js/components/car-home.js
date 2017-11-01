import * as React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from '../environment';
import { CarTableContainer } from './car-table';
import { CarForm } from './car-form';
import { insertCar as relayInsertCar } from '../mutations/insert-car';
import { deleteCar as relayDeleteCar } from '../mutations/delete-car';


export class CarHome extends React.Component {

  render() {

    return <section>

      <h2>Cars Tool</h2>

      <QueryRenderer
      
        environment={environment}
        query={graphql`
          query carHomeQuery {
            viewer {
              id
              ...carTable_viewer
            }
          }
        `}
        variables={{}}
        render={ ({ error, props, retry }) => {

          const reactInsertCar = car => {
            relayInsertCar(
              environment,
              props.viewer.id,
              car,
            );
          };

          const reactDeleteCar = carId => {
            relayDeleteCar(
              environment,
              props.viewer.id,
              carId,
            );
          };          

          if (props) {
            return <div>
              <CarTableContainer viewer={props.viewer}
                onDeleteCar={reactDeleteCar} />
              <CarForm onSubmitCar={reactInsertCar} />
            </div>;
          } else {
            return <div>Loading...</div>;
          }

        } } />
    </section>;

  }

}