import * as React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from '../environment';

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
                edges { node {
                  id name description color size quantity
                } }
              }
            }
          }
        `}
        variables={{}}
        render={ ({ error, props, retry }) => {

          if (props) {
            return <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {props.viewer.widgets.edges.map(
                  ({ node: { id, name, description, color, size, quantity } }) => (
                    <tr key={id}>
                      <td>{name}</td>
                      <td>{description}</td>
                      <td>{color}</td>
                      <td>{size}</td>
                      <td>{quantity}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>;
          } else {
            return <div>Loading...</div>
          }

        } }
      
       />
    </section>;

  }

}