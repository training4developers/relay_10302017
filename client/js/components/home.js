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
              ...widgetTable_viewer
            }
          }
        `}
        variables={{}}
        render={ ({ error, props, retry }) => {

          if (props) {
            return <WidgetTableContainer viewer={props.viewer} />;
          } else {
            return <div>Loading...</div>;
          }

        } }
      
       />
    </section>;

  }

}