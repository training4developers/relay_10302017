import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import { PaginatedWidgetTableContainer } from './paginated-widget-table';
import { deleteWidget as relayDeleteWidget } from '../mutations/delete-widget';

export class WidgetTableHome extends React.Component {


  reactDeleteWidget = widgetId => {
    return relayDeleteWidget(
      this.props.relay.environment,
      this.props.viewer.id,
      widgetId,
    );
  };


  render() {
    return <PaginatedWidgetTableContainer viewer={this.props.viewer}
      onDeleteWidget={this.reactDeleteWidget}
      onCreateWidget={this.props.onCreateWidget} />;
  }

}

export const WidgetTableHomeContainer = createFragmentContainer(WidgetTableHome, graphql`
  fragment widgetTableHome_viewer on Viewer {
    id
    ...paginatedWidgetTable_viewer
  }
`);