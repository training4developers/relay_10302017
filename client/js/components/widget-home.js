import * as React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from '../environment';
import { WidgetTableContainer } from './widget-table';
import { WidgetForm } from './widget-form';
import { insertWidget as relayInsertWidget } from '../mutations/insert-widget';

export class WidgetHome extends React.Component {

  render() {

    return <section>

      <h2>Widgets Tool</h2>

      <QueryRenderer
      
        environment={environment}
        query={graphql`
          query widgetHomeQuery {
            viewer {
              id
              ...widgetTable_viewer
            }
          }
        `}
        variables={{}}
        render={ ({ error, props, retry }) => {

          const reactInsertWidget = widget => {
            relayInsertWidget(
              environment,
              props.viewer.id,
              widget,
            );
          };

          if (error) {
            return <div>
              <div>Error... {error.message}</div>
              <a onClick={() => retry()}>Retry</a>
            </div>;
          } else if (props) {
            return <div>
              <WidgetTableContainer viewer={props.viewer} />
              <WidgetForm onSubmitWidget={reactInsertWidget} />
            </div>;
          } else {
            return <div>Loading...</div>;
          }

        } } />
    </section>;

  }

}