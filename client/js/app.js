import 'bootstrap-loader';
import '../scss/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  createBrowserRouter, makeRouteConfig, Route, Link
} from 'found';

import { HomePage } from './components/home-page'; 

class AppPage extends React.Component {

  static propTypes = {
    children: PropTypes.object,
  };

  render() {
    return <div>
      <header>
        <h1>Sample React/GraphQL/Relay App</h1>
      </header>
      <nav>
        <ul>
        </ul>
      </nav>
      {this.props.children}
      <footer>
        <small>&copy; 2017, A Cool Company, Inc.</small>
      </footer>
    </div>;
  }
}

const BrowserRouter = createBrowserRouter({
  routeConfig: makeRouteConfig(
    <Route path="/" Component={AppPage}>
      <Route Component={HomePage} />
    </Route>
  ),
});

ReactDOM.render(
  <BrowserRouter />,
  document.querySelector('main'),
);