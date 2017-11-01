import React from 'react';
import { createPaginationContainer, graphql } from 'react-relay';

import { WidgetViewRowContainer } from './widget-view-row';

export class WidgetTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      lastPageLoaded: 0,
      pageLength: 3,
    };
  }

  static defaultProps = {
    viewer: {
      widgets: { 
        edges: [],
      },
    },
  }

  loadPrev = () => {
    
    if (!this.props.relay.isLoading()) {
      
      if (this.state.currentPage > 0) {
        this.setState({
          currentPage: this.state.currentPage - 1,
        });
      }

    }

  };

  loadNext = () => {

    if (!this.props.relay.isLoading()) {

      const nextPage = this.state.currentPage + 1;
      let { lastPageLoaded } = this.state;
    
      if (this.props.relay.hasMore() && nextPage > lastPageLoaded) {
        lastPageLoaded = nextPage;
        this.props.relay.loadMore(this.state.pageLength);
      }

      this.setState({
        currentPage: nextPage,
        lastPageLoaded,
      });

    }
  };

  render() {

    return <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Color</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {do {
            const { currentPage, pageLength } = this.state;
            const startIndex = currentPage * pageLength;
            const { edges: widgetEdges } = this.props.viewer.widgets;
            const endIndex = startIndex + pageLength;

            if (this.props.viewer.widgets == null) {
              <tr><td colSpan="6">There are no widgets.</td></tr>;
            } else {
              widgetEdges.slice(startIndex, endIndex).map( ({ node: widget }) => do {
                <WidgetViewRowContainer key={widget.id} widget={widget}
                  onDeleteWidget={this.props.onDeleteWidget} />;
              });
            }
          }}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ textAlign: 'right', width:'100%' }}>
                  {do {
                    if (this.state.currentPage > 0) {
                      <button type="button" onClick={this.loadPrev}>Prev</button>;
                    }
                  }}
                </div>
                <div style={{ textAlign: 'center', width:'100%' }}>
                  {this.state.currentPage + 1} of { Math.ceil(this.props.viewer.widgets.totalCount / this.state.pageLength) } pages
                </div>
                <div style={{ textAlign: 'left', width:'100%' }}>
                  {do {
                    if (this.props.viewer.widgets.pageInfo.hasNextPage
                      || this.state.currentPage < this.state.lastPageLoaded) {
                      <button type="button" onClick={this.loadNext}>Next</button>;
                    }
                  }}
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>;
  }

}

export const PaginatedWidgetTableContainer = createPaginationContainer(
  WidgetTable,
  graphql.experimental`
    fragment paginatedWidgetTable_viewer on Viewer @argumentDefinitions(
        count: { type: "Int", defaultValue: 3 }
        cursor: { type: "String" }
      ) {
      widgets(
        first: $count
        after: $cursor
      ) @connection(key: "WidgetTable_widgets") {
        edges {
          node {
            id
            ...widgetViewRow_widget
          }
          cursor
        }
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  `, {
    direction: 'forward',
    getConnectionFromProps: (props) => {
      return props.viewer && props.viewer.widgets;
    },
    getFragmentVariables: (prevVars, totalCount) => {
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables: (props, { count, cursor }) => {
      return {
        count,
        cursor,
      };
    },
    query: graphql.experimental`
      query paginatedWidgetTableQuery(
        $count: Int!
        $cursor: String
      ) {
        viewer {
          ...paginatedWidgetTable_viewer @arguments(count: $count, cursor: $cursor)
        }
      }
    `
  },
);
