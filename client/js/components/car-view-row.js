import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

export class CarViewRow extends React.Component {

  render() {
    return <tr>
      <td>{this.props.car.make}</td>
      <td>{this.props.car.model}</td>
      <td>{this.props.car.year}</td>
      <td>{this.props.car.color}</td>
      <td>{this.props.car.price}</td>
    </tr>;
  }
}

export const CarViewRowContainer = createFragmentContainer(CarViewRow, graphql`
  fragment carViewRow_car on Car {
    id make model year color price
  }
`);