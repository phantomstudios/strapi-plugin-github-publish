'use strict';

module.exports = [
  {
    method: 'GET',
    path: '/check',
    handler: 'publish.check',
    config: {
      policies: []
    }
  },
  {
    method: 'GET',
    path: '/publish',
    handler: 'publish.publish',
    config: {
      policies: []
    }
  }
];
