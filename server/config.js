module.exports = {
  default: {},
  validator: ({ owner, repo, workflow_id, token, branch }) => {
    if (!owner) {
      throw new Error("owner is a required");
    }
    if (!repo) {
      throw new Error("repo is a required");
    }
    if (!workflow_id) {
      throw new Error("workflow_id is a required");
    }
    if (!token) {
      throw new Error("token is a required");
    }
    if (!branch) {
      throw new Error("branch is a required");
    }
  },
};
