import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

export class WidgetViewRow extends React.Component {

  render() {
    return <tr>
      <td>{this.props.widget.name}</td>
      <td>{this.props.widget.description}</td>
      <td>{this.props.widget.color}</td>
      <td>{this.props.widget.size}</td>
      <td>{this.props.widget.quantity}</td>
      <td></td>
    </tr>;
  }

}

export const WidgetViewRowContainer = createFragmentContainer(WidgetViewRow, graphql`
  fragment widgetViewRow_widget on Widget {
    id
    name
    description
    color
    size
    quantity
  }
`);

