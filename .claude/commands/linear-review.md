# Review changes and create PR for a Linear issue

## Input

$ARGUMENTS — Linear issue identifier (e.g. BCTT-123). If not provided, infer from the current branch name.

## Phase 1: Review

1. **Identify the issue**: Extract the BCTT issue number from the argument or current branch name.

2. **Check prerequisites**:
   - Confirm `gh` CLI is available and authenticated: `gh auth status`
   - Check if a PR already exists for this branch: `gh pr list --head $(git branch --show-current)`
   - If a PR already exists, show it to the user and ask whether to update it or stop.

3. **Check branch state**:
   - Run `git fetch origin` to get latest remote state
   - Determine the default branch: check what `origin/HEAD` points to — don't assume `main`
   - Check if the branch has diverged from the default branch: `git log --oneline <default-branch>..HEAD` and `git log --oneline HEAD..<default-branch>`
   - If the default branch has moved ahead, warn the user — they may want to rebase before creating a PR.

4. **Review changes**: Run `git diff <default-branch>...HEAD` to see all changes on this branch. Summarise what was actually changed (not what was planned — describe the real diff) and verify it aligns with the Linear issue requirements.

5. **Validate**:
   - Run `npx astro check` — must pass with no new errors.
   - Check for UK English in any user-facing content changes.
   - Verify accessibility: aria-labels present, heading hierarchy correct.
   - Confirm external URLs use `siteConfig.ts`.
   - If validation fails, stop and tell the user. Do not create a PR with failing checks.

6. **Present summary for approval**: Show the user:
   - The PR title and body you propose
   - The list of changed files
   - Any concerns from the review
   - Ask for confirmation before pushing and creating the PR.

## Phase 2: Create PR (after approval only)

7. **Push and create PR**:
   - Push the branch to origin with `-u` flag
   - Create a PR using `gh pr create` with:
     - Title referencing the issue: e.g. "Fix navbar spacing (BCTT-42)"
     - Body with summary of changes, test plan, and Linear issue link
   - If the push or PR creation fails, report the error clearly.

8. **Update Linear**: Add a comment to the issue with the PR link. Move the issue to the appropriate review state (check available states first — don't assume "In Review" exists).

9. **Report**: Show the PR URL and a summary of what was submitted.
