# Pick up a Linear issue and work on it

## Input

$ARGUMENTS — Linear issue identifier (e.g. BCTT-123) or a description to search for.

## Phase 1: Understand (no code changes)

1. **Find the issue**: Use Linear tools to look up the issue by ID or search for it. Display the issue title, description, status, priority, and any comments.

2. **Sync the repo and check for prior work**:
   - Run `git fetch origin` to get latest remote state
   - Check if a branch already exists for this issue: `git branch -a | grep -w BCTT-nnn` (use the exact issue number to avoid partial matches like BCTT-42 matching BCTT-420)
   - **If a branch exists**: This issue has prior work. Switch to it, run `git log --oneline main..HEAD` to see what's been done, review the diff, and read any Linear comments about progress. Summarise the current state to the user and ask how to proceed (continue, start fresh, or review what's there).
   - **If no branch exists**: Ensure the default branch is current. Check what branch `origin/HEAD` points to — don't assume `main`. Confirm working tree is clean.
   - If there are uncommitted changes, stop and ask the user how to proceed.

3. **Explore the codebase**: Identify the files and components that would be affected. Read relevant code to understand the current state. If docs are needed, check `docs/CLAUDE.md` for the right reference file.

4. **Present a plan**: Summarise your understanding and proposed approach. Include:
   - **What the issue is asking for** (in your own words — flag any ambiguity)
   - **Files to change** (list specific files and what changes each needs)
   - **Approach** (how you'll implement it, any design decisions)
   - **Definition of done** — what needs to be true for this to be complete:
     - Which checks must pass (`npx astro check` at minimum)
     - Whether the change needs visual review (layout, styling, responsive)
     - Whether mobile testing is relevant
     - Any acceptance criteria from the issue itself
   - **Questions or concerns** (anything unclear, scope decisions, trade-offs)
   - **Estimated scope** (small/medium/large — how many files, rough complexity)

5. **Wait for approval**: Do NOT proceed until the user confirms the plan or provides corrections. The user may:
   - Approve as-is → proceed to Phase 2
   - Clarify requirements → revise the plan and present again
   - Narrow or expand scope → adjust and confirm
   - Provide additional context not in the issue → incorporate and confirm

## Phase 2: Implement (after approval only)

6. **Create a branch**:
   - First ensure the default branch is current
   - Read the branch prefix from CLAUDE.local.md. If not set, ask the user what prefix to use — do NOT guess from `git config user.name`
   - Format: `prefix/BCTT-nnn-short-description`
   - Example: `chandimad/BCTT-42-fix-navbar-spacing`

7. **Update Linear**: Look up the available workflow states for this team first. Move the issue to the appropriate "in progress" state (the name varies — check what states exist). Add a comment:
   ```
   Started work on branch `chandimad/BCTT-42-fix-navbar-spacing`

   Plan:
   - [brief summary of what will change]
   ```

8. **Implement the changes**: Follow all project rules from CLAUDE.md. Use multiple commits if the work has logically separate steps — don't force everything into one commit.

9. **Validate**: Run the checks agreed in the definition of done. At minimum:
   - `npx astro check` must pass with no new errors
   - If changes are visual, note which pages/viewports to check
   - **If validation fails**: Fix the issue if it's straightforward. If the fix is non-trivial or changes the scope of work, stop and discuss with the user before continuing.

10. **Commit**: Stage and commit with a clear message referencing the issue:
    - Example: `Fix navbar spacing on mobile (BCTT-42)`
    - If scope grew significantly during implementation, stop and tell the user what happened before committing. The plan may need revising.

## Phase 3: Wrap up

11. **Update Linear**: Add a detailed comment to the issue:
    ```
    Changes complete on branch `chandimad/BCTT-42-fix-navbar-spacing`

    What changed:
    - [file1]: [what and why]
    - [file2]: [what and why]

    Decisions made:
    - [any choices made during implementation]

    Validated:
    - [x] `npx astro check` passes
    - [x] [other checks from definition of done]

    Open items:
    - [anything not done, follow-ups, or things to watch]
    ```
    If the work is fully complete and validated, move the issue to the appropriate "done" or "review" state (check available states first).
    If it needs review first, leave it in progress and note that a PR is needed.

12. **Next steps**: Tell the user clearly:
    - Whether a PR should be created (use `/linear-review` for this)
    - Whether there are open items or follow-up issues to create
    - Whether the issue is done or still needs work
