import * as React from 'react';

import { createFragmentContainer, graphql } from 'react-relay';

export class WidgetTable extends React.Component {

  render() {
    return <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Size</th>
          <th>Color</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {this.props.viewer.widgets.edges.map(
          ({ node: { id, name, description, color, size, quantity } }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{description}</td>
              <td>{color}</td>
              <td>{size}</td>
              <td>{quantity}</td>
            </tr>
          )
        )}
      </tbody>
    </table>;
  }
}

export const WidgetTableContainer = createFragmentContainer(WidgetTable, graphql`
  fragment widgetTable_viewer on Viewer {
    widgets {
      edges {
        node {
          id
          name
          description
          color
          size
          quantity
        }
      }
    }
  }
`);