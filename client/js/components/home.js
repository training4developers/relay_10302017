import * as React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from '../environment';

import { WidgetTableContainer } from './widget-table';

export class Home extends React.Component {

  render() {

    return <section>
      <QueryRenderer
      
        environment={environment}
        query={graphql`
          query homeQuery {
            viewer {
              id
              widgets {
                edges {
                  node {
                    id
                  }
                }
              }
              ...widgetTable_viewer
            }
          }
        `}
        variables={{}}
        render={ ({ error, props, retry }) => {

          if (props) {
            return <div>
              <div>Widget Count: {props.viewer.widgets.edges.length}</div>
              <WidgetTableContainer viewer={props.viewer} />
            </div>;
          } else {
            return <div>Loading...</div>;
          }

        } } />
    </section>;

  }

}