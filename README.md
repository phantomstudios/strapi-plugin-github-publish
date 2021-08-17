# Strapi plugin github-publish

[![NPM version][npm-image]][npm-url]
[![Actions Status][ci-image]][ci-url]
[![PR Welcome][npm-downloads-image]][npm-downloads-url]

This is a plugin for [Strapi](https://github.com/strapi/strapi) headless CMS. It lets you trigger a GitHub Action workflow when the site is ready to be published.

## Introduction

![Screenshot](./docs/screenshot.png "Plugin Screenshot")

When using Strapi as a headless CMS for a statically built website you need a way to trigger the site to rebuild when content has been updated. The typical approach is to setup a Strapi managed webhook to trigger a CI/CD pipeline whenever content changes. This approach has it's issues. For example when making many changes to content, builds are triggered multiple times and deployments can fail due to the site being deployed concurrently.

This plugin tackles the publishing flow a different way. The site administrators can take their time and make many changes and once the content update is complete they can trigger a single build.

This plugin also checks to see if an `in_progress` build is active or if anything is in the `queue` and not allow the user to trigger another. Also, when a build has been triggered the user can wait on the plugin page to see when the build and deployment has completed.

## Installation

Install this plugin with npm or yarn.

With npm:

```bash
npm install strapi-plugin-github-publish
```

With yarn:

```bash
yarn add strapi-plugin-github-publish
```

## Configuration

Generate a config file at `config/plugins.js` or `config/development/plugins.js` etc...

```javascript
module.exports = ({ env }) => ({
  "github-publish": {
    owner: "username", // The gothub organisation or user
    repo: "reponame", // The name of the repository
    workflow_id: "rebuild.yml", // The workflow_id or filename
    token: env("GITHUB_TOKEN"), // The GitHub personal access token with access to trigger workflows and view build status
    branch: "master", // The branch the workflow should be triggered on
    inputs: {
      // Optional inputs to pass through to the GitHub workflow
      some_input: "Some value",
      some_other_input: "Some other value",
    },
  },
});
```

Make sure you have variable in your .env file

```bash
GITHUB_TOKEN=XXXXXXX
```

## Use the Plugin

When the plugin has been installed correctly just click on `GitHub Publishing` in the sidebar under plugins then click "Publish".

[npm-image]: https://img.shields.io/npm/v/strapi-plugin-github-publish.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/strapi-plugin-github-publish
[npm-downloads-image]: https://img.shields.io/npm/dm/strapi-plugin-github-publish.svg
[npm-downloads-url]: https://npmcharts.com/compare/strapi-plugin-github-publish?minimal=true
[ci-image]: https://github.com/phantomstudios/strapi-plugin-github-publish/workflows/Test/badge.svg
[ci-url]: https://github.com/phantomstudios/strapi-plugin-github-publish/actions
