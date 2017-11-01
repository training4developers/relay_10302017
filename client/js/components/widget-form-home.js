import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { WidgetForm } from './widget-form';

import { insertWidget as relayInsertWidget } from '../mutations/insert-widget';

export class WidgetFormHome extends React.Component {

  reactInsertWidget = widget => {
    return relayInsertWidget(
      this.props.relay.environment,
      this.props.viewer.id,
      widget,
    );
  };

  render() {
    return <WidgetForm
      onSubmitWidget={this.reactInsertWidget}
      onShowWidgetTable={this.props.onShowWidgetTable} />;
  }

}

export const WidgetFormHomeContainer = createFragmentContainer(
  WidgetFormHome, graphql`
    fragment widgetFormHome_viewer on Viewer {
      id
    }
  `
);