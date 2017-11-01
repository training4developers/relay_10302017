import * as React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from '../environment';

import { WidgetFormHomeContainer } from './widget-form-home';


export class WidgetFormPage extends React.Component {

  showWidgetTable = () => {
    this.props.router.push('/widgets');
  }

  render() {

    return <section>

      <h2>Widgets Tool</h2>
      <h3>Widget Form</h3>

      <QueryRenderer
      
        environment={environment}
        query={graphql`
          query widgetFormPageQuery {
            viewer {
              id
              ...widgetFormHome_viewer
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
            return <WidgetFormHomeContainer
              viewer={props.viewer}
              onShowWidgetTable={this.showWidgetTable} />;
          } else {
            return <div>Loading...</div>;
          }

        } } />
    </section>;

  }

}