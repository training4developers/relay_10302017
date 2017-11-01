import * as React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from '../environment';

export class WidgetFindPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      widgetId: null,
    };
  }

  showWidgetTable = () => {
    this.props.router.push('/widgets');
  };

  findWidgetById = () => {
    this.setState({
      widgetId: this.widgetIdInput.value,
    });
  };

  render() {

    return <section>

      <h2>Widgets Tool</h2>
      <h3>Widget Find</h3>

      <form>
        <label>Widget Id:</label>
        <input type="text" id="widget-id-input"
          ref={input => this.widgetIdInput = input} />
        <button type="button" onClick={this.findWidgetById}>Find</button>
      </form>

      <QueryRenderer
        environment={environment}
        query={graphql`
          query widgetFindPageQuery($widgetId: String) {
            viewer {
              id
              widget(widgetId: $widgetId) {
                id
                name
                description
                color
                size
                quantity
              }
            }
          }
        `}
        variables={{
          widgetId: String(this.state.widgetId),
        }}
        render={ ({ error, props, retry }) => {

          if (error) {
            return <div>
              <div>Error... {error.message}</div>
              <a onClick={() => retry()}>Retry</a>
            </div>;
          } else if (props) {

            if (!props.viewer.widget.name) {
              return <div>Please enter a widget id to find.</div>;  
            } else {
              return <div>
                <h4>Widget Results:</h4>
                <div>Name: {props.viewer.widget.name}</div>
                <div>Description: {props.viewer.widget.description}</div>
                <div>Color: {props.viewer.widget.color}</div>
                <div>Size: {props.viewer.widget.size}</div>
                <div>Quantity: {props.viewer.widget.quantity}</div>
              </div>;
            }
          } else {
            return <div>Loading...</div>;
          }

        } } />
    </section>;

  }

}