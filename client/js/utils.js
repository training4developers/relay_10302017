export const connectionEdgesToArray = (connection) => {
  return connection.edges.map(edge => edge.node);
};