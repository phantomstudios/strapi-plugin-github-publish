# Strapi plugin github-publish

This is a plugin for [strapi](https://github.com/strapi/strapi) headless CMS
It lets you trigger a GitHub Action workflow when the site is ready to be published.

## Get Started

1. Install the package

With yarn:

`yarn add @phntms/strapi-plugin-github-publish`

With npm:

`npm install @phntms/strapi-plugin-github-publish`

2. Generate a config file at `config/plugins.js` or `config/development/plugins.js` etc...

```js
module.exports = ({ env }) => ({
  "github-publish": {
    owner: "username",
    repo: "reponame",
    workflow_id: "rebuild.yml",
    token: env("GITHUB_TOKEN"),
    branch: "master",
  },
});
```

Then make sure you have variable in your .env file

```sh
GITHUB_TOKEN=XXXXXXX
```
