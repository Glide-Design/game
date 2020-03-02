[![CircleCI](https://circleci.com/gh/OurStarClub/web/tree/development.svg?style=svg&circle-token=fa72a1af0114ac7640657d9bd27445ae166d9279)](https://circleci.com/gh/OurStarClub/web/tree/development)
# Otro

### Project Structure

We use [Yarn workspaces](https://yarnpkg.com/en/docs/workspaces). Our packages are,

- `xi-core`: code that will be shared between web and native
- `packages/web`: the main web client
- `packages/server`: the hapi server that serves the web app (with some pseudo-SSR)
- `packages/app`: the react native mobile app

> Packages/app has its own readme, which you'll need to read to run the app

To install dependencies everywhere, including in all projects, run

```
yarn
```

For running our feature/e2e/acceptance tests:

```
yarn global add selenium-standalone
selenium-standalone install
selenium-standalone start
```

Unit tests are run from the top level. Just run `yarn test`.
Feature/e2e/acceptance tests are run on a per-workspace basis since they require different environments, just run: `yarn workspace web e2e`.

When in a project folder (i.e. `packages/web`), your scripts work as normal, so you can use `yarn start` to run the server. You could also run `yarn workspace web start` from any folder, if this is easier.

#### Creating a New Project

If you need to create a new project to be shared with web or mobile, initialize a regular package under `packages`. (`yarn init --yes`). To use this in other projects, just add the project name and version under `dependencies` in the new project.

```diff
 {
   "dependencies": {
+    "new-project": "1.0.0"
   }
 }
```

Then run `yarn` again to get everything synced up.

> You'll also need to edit the `fix-xi-core` step to add this project — see app/readme for details

#### Workaround for App

The monorepo structure doesn't yet work with React Native. To work around this, you'll need to run `yarn workspace app fix-xi-core`. There's more detail in the app readme.

> Running `fix-xi-core` can break some tests. Run `yarn` to revert running `fix-xi-core`

## Tests

Tests are run from the project root. Run `yarn test` or `yarn test --watch` to run tests among all projects. The latter will only test changed files and tests.

## Translations

Translations are are handled in `xi-core`. It pulls out the translations from `react-intl`'s `<FormattedMessage />`s and `defineMessage`s.

Running `yarn workspace xi-core translate` will translate both the `web`, `native`, and parts of `xi-core`. The translation files are shared between them (although there isn't a requirement for this).
