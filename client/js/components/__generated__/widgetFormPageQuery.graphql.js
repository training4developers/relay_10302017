/**
 * @flow
 * @relayHash 61498eb272fac2823da7de9d96aeda94
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type widgetFormPageQueryResponse = {|
  +viewer: ?{|
    +id: string;
  |};
|};
*/


/*
query widgetFormPageQuery {
  viewer {
    id
    ...widgetFormHome_viewer
  }
}

fragment widgetFormHome_viewer on Viewer {
  id
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "widgetFormPageQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "FragmentSpread",
            "name": "widgetFormHome_viewer",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "widgetFormPageQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "widgetFormPageQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query widgetFormPageQuery {\n  viewer {\n    id\n    ...widgetFormHome_viewer\n  }\n}\n\nfragment widgetFormHome_viewer on Viewer {\n  id\n}\n"
};

module.exports = batch;
