import React from 'react';
import PropTypes from 'prop-types';

import { createFragmentContainer, graphql } from 'react-relay';


export class WidgetViewRow extends React.Component {

  static propTypes = {
    widget: PropTypes.object,
    onDeleteWidget: PropTypes.func,
  };

  render() {
    return <tr>
      <td>{this.props.widget.name}</td>
      <td>{this.props.widget.description}</td>
      <td>{this.props.widget.color}</td>
      <td>{this.props.widget.size}</td>
      <td>{this.props.widget.quantity}</td>
      <td><button type="button"
        onClick={() => this.props.onDeleteWidget(this.props.widget.id)}>
          Delete
      </button></td>
    </tr>;
  }

}

export const WidgetsViewRowContainer = createFragmentContainer(WidgetViewRow, graphql`
  fragment widgetsViewRow_widget on Widget {
    id
    name
    description
    color
    size
    quantity
  }
`);