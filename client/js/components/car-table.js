import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import { CarViewRowContainer } from './car-view-row';

export class CarTable extends React.Component {

  render() {
    return <table className='table table-striped'>
      <thead>
        <tr>
          <th>Make</th>
          <th>Model</th>
          <th>Year</th>
          <th>Color</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.props.viewer.cars.edges.map(
          ({ node: car }) => (<CarViewRowContainer key={car.id} car={car} carMake={car} />)
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="6">Car Count: {this.props.viewer.cars.edges.length}</td>
        </tr>
      </tfoot>
    </table>;
  }
}

export const CarTableContainer = createFragmentContainer(CarTable, graphql`
  fragment carTable_viewer on Viewer {
    cars {
      edges {
        node {
          id
          ...carViewRow_car
        }
      }
    }
  }
`);