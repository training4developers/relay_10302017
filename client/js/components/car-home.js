import * as React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from '../environment';
import { CarTableContainer } from './car-table';

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

          if (props) {
            return <CarTableContainer viewer={props.viewer} />;
          } else {
            return <div>Loading...</div>;
          }

        } } />
    </section>;

  }

}