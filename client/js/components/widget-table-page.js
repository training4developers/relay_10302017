import * as React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from '../environment';
import { WidgetTableHomeContainer } from './widget-table-home';

export class WidgetTablePage extends React.Component {

  createWidget = () => {
    this.props.router.push('/create-widget');
  }

  render() {

    return <section>

      <h2>Widgets Tool</h2>
      <h3>Widgets Table</h3>

      <QueryRenderer
      
        environment={environment}
        query={graphql`
          query widgetTablePageQuery {
            viewer {
              id
              ...widgetTableHome_viewer
            }
          }
        `}
        render={ ({ error, props, retry }) => {


          if (error) {
            return <div>
              <div>Error... {error.message}</div>
              <a onClick={() => retry()}>Retry</a>
            </div>;
          } else if (props) {
            return <WidgetTableHomeContainer viewer={props.viewer}
              onCreateWidget={this.createWidget} />;
          } else {
            return <div>Loading...</div>;
          }

        } } />
    </section>;

  }

}