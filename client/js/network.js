// standard example of a query operation for connecting
// Relay to GraphQL
export const fetchQuery = (operation, variables) => {
  return fetch('/wedgraphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(res => res.json());
};