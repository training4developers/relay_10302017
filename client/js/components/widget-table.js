import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import { WidgetViewRowContainer } from './widget-view-row';

export class WidgetTable extends React.Component {

  render() {
    return <table className='table table-striped'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Size</th>
          <th>Color</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {this.props.viewer.widgets.edges.map(
          ({ node: widget }) => <WidgetViewRowContainer key={widget.id} widget={widget} />
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="6">Widgets Count: {this.props.viewer.widgets.totalCount}</td>
        </tr>
      </tfoot>
    </table>;
  }
}

export const WidgetTableContainer = createFragmentContainer(WidgetTable, graphql`
  fragment widgetTable_viewer on Viewer {
    widgets {
      edges {
        node {
          id
          ...widgetViewRow_widget
        }
      }
      totalCount
    }
  }
`);