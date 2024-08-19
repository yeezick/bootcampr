# E2E Cypress Workflow

This workflow is responsible for setting up and running E2E tests automatically
on pull requests. There are 3 jobs that run in this workflow:

- `change-base`
- `link-e2e-manual-trigger`
- `cypress-run`

**Triggers**

- New pull requests
- Pushes to `release/` or `hotfix/` branches
- Manually triggers from repo actions

## `change-base`

Responsible for changing the base branch for PR's pointing to main if they are
not `release/` or `hotfix/` branches to prevent accidental merges to `main`.

### Conditions to run

- Triggered by new pull requests
- Pull request is pointing to `main`
- Pull request branch is not `release/` or `hotfix/`

### Steps

1. Checks out current repo for git context
1. Uses git CLI to change pull request base to current release

### Notes

- For this to work properly, repository variable `CURRENT_RELEASE` **must** be
  updated after a release branch has been merged and a new release branch has
  been created

## `link-manual-e2e-trigger`

Adds a comment to new pull requests with a link to repo actions so that
developers can manually trigger E2E tests for their branch.

Cypress tests are only automatically run for `release/` and `hotfix/` branches.

### Conditions to run

- Triggered by new pull requests

### Steps

1. Uses github API to add comment to pull request

## `cypress-run`

Runs the Cypress E2E suite.

### Conditions to run

- Cannot be a pull request event (PR creations automatically trigger a `push`
  event)

### Steps

1. Pulls down [repo with Cypress tests](https://github.com/yeezick/collabify-qa)
   on the branch that triggered this workflow
1. If the branch doesn't exist in
   [collabify-qa](https://github.com/yeezick/collabify-qa), repo is checked out
   on `main`
1. Runs the Cypress tests suite on the (deployed release
   branch)[https://dev.collabify.ai]

### Notes

- Runs are automatically recorded and viewable in
  [Cypress Cloud](https://cloud.cypress.io/organizations/352c4ab7-ecb6-4ba4-bc7f-5a2d3c3a6f8e/projects)
