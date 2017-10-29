import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

import { insertWidget as relayInsertWidget } from '../mutations/insert-widget';
import { deleteWidget as relayDeleteWidget } from '../mutations/delete-widget';

import { WidgetsTableContainer } from './widgets-table';
import { WidgetForm } from './widget-form';

export class WidgetHome extends React.Component {

  static propTypes = {
    viewer: PropTypes.object,
    relay: PropTypes.object,
  };

  reactInsertWidget = widget => {
    relayInsertWidget(
      this.props.relay.environment,
      widget,
      this.props.viewer.id,
    ).then(res => console.log(res)).catch(err => console.log(err));
  };

  reactDeleteWidget = widgetId => {
    relayDeleteWidget(
      this.props.relay.environment,
      widgetId,
      this.props.viewer.id,
    );
  }

  render() {

    return <div>
      <WidgetsTableContainer viewer={this.props.viewer} onDeleteWidget={this.reactDeleteWidget} />
      <WidgetForm onSaveWidget={this.reactInsertWidget} />
    </div>;

  }
}

export const WidgetHomeContainer = createFragmentContainer(
  WidgetHome,
  graphql`
    fragment widgetHome_viewer on Viewer {
      id
      ...widgetsTable_viewer
    }
  `,
);
