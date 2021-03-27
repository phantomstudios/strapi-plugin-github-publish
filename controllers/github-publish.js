"use strict";

const axios = require("axios");

const pluginId = require("../admin/src/pluginId");

module.exports = {
  // Check if workflow is in_progress https://docs.github.com/en/rest/reference/actions#list-workflow-runs
  check: async (ctx) => {
    const { owner, repo, workflow_id, token, branch } = strapi.plugins[
      pluginId
    ].config;

    const headers = {
      Accept: "application/vnd.github.v3+json",
      Authorization: "token " + token,
    };

    const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/runs?branch=${branch}&status=in_progress`;
    const { data } = await axios.get(url, { headers });
    const busy = !!data.total_count;

    ctx.send({ busy });
  },

  publish: async (ctx) => {
    const { owner, repo, workflow_id, token, branch: ref } = strapi.plugins[
      pluginId
    ].config;

    const headers = {
      Accept: "application/vnd.github.v3+json",
      Authorization: "token " + token,
    };

    const data = { ref };

    const url = `https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow_id}/dispatches`;
    const { status } = await axios.post(url, data, { headers });
    const success = status === 204;

    ctx.send({ success });
  },
};
