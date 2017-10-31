import * as React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from '../environment';
import { WidgetTableContainer } from './widget-table';

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

          if (error) {
            return <div>
              <div>Error... {error.message}</div>
              <a onClick={() => retry()}>Retry</a>
            </div>;
          } else if (props) {
            return <WidgetTableContainer viewer={props.viewer} />;
          } else {
            return <div>Loading...</div>;
          }

        } } />
    </section>;

  }

}