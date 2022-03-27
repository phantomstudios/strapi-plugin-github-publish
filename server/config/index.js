'use strict';

module.exports = {
  default: () => ({
    owner: '',
    repo: '',
    workflow_id: '',
    token: '',
    branch: '',
    inputs: {},
  }),
  validator(config) {
    if (!config.owner) {
      throw new Error('owner is required');
    }
    if (!config.repo) {
      throw new Error('repo is required');
    }
    if (!config.workflow_id) {
      throw new Error('workflow_id is required');
    }
    if (!config.token) {
      throw new Error('token is required');
    }
    if (!config.branch) {
      throw new Error('branch is required');
    }
  }
};
