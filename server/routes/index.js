module.exports = [
  {
    method: "GET",
    path: "/check",
    handler: "githubPublish.check",
    config: { policies: [] },
  },
  {
    method: "GET",
    path: "/publish",
    handler: "githubPublish.publish",
    config: { policies: [] },
  },
];
