module.exports = {
  default: {},
  validator: ({ owner, repo, workflow_id, token, branch }) => {
    if (!owner) {
      throw new Error("owner is required");
    }
    if (!repo) {
      throw new Error("repo is required");
    }
    if (!workflow_id) {
      throw new Error("workflow_id required");
    }
    if (!token) {
      throw new Error("token is required");
    }
    if (!branch) {
      throw new Error("branch is required");
    }
  },
};
