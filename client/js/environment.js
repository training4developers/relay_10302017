import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { fetchQuery } from './network';

// initialize the relay environment with the default store
// and the network configuration
// the standard network configuration with fetch is being used
export const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});