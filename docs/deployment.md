# Deployment & Infrastructure

How the Better Conversations Foundation website is built and published.

## Overview

The site is a static Astro build. GitHub Actions builds it and rsyncs the output
to a self-hosted server over SSH. There is no managed hosting platform (no Netlify,
Vercel, or GitHub Pages) and, since the migration described below, **no Tailscale**.

The workflow lives in [`.github/workflows/main.yml`](../.github/workflows/main.yml).

## Runner

The job runs on a **self-hosted runner** (`runs-on: self-hosted`), not a
GitHub-hosted `ubuntu-latest` runner. At least one active self-hosted runner
carrying the default `self-hosted` label must be registered to the repository or
its organisation, otherwise the workflow queues indefinitely with no runner to
pick it up. Register runners under **Settings → Actions → Runners**. The runner
needs Node 20 available (the `actions/setup-node` step provisions it) and outbound
SSH to `crumpet.amphora.cloud` on port `1970` for the deploy step.

## How it works

1. **Trigger** — push or pull request to `main`, or a manual `workflow_dispatch`.
   PRs build only; deployment steps are guarded by
   `if: github.ref == 'refs/heads/main'`, so they run only on pushes to `main`.
2. **Build** — Node 20 runs `npm install && npm run build`. Astro outputs the static
   site to the default `./dist/` directory.
3. **Set up SSH key** — the private key in the `CRUMPET_ACCOUNT_SSH_KEY` secret is
   written to `~/.ssh/crumpet_deploy` (mode `600`) on the runner.
4. **Deploy** — rsync mirrors `dist/` to the server over SSH:

   ```bash
   rsync --delete -vv -r \
     -e 'ssh -i ~/.ssh/crumpet_deploy -p 1970 -o StrictHostKeyChecking=no' \
     dist/ bcf-web@crumpet.amphora.cloud:public_html/
   ```

   `--delete` makes `public_html` an exact mirror of the latest build — files on the
   server that are not in `dist/` are removed.

## Target server

| Setting | Value |
|---------|-------|
| Host | `crumpet.amphora.cloud` |
| SSH port | `1970` |
| User | `bcf-web` |
| Deploy path | `~/public_html` (i.e. `/home/bcf-web/public_html`) |
| Host key checking | disabled (`StrictHostKeyChecking=no`) |

## Required GitHub secret

| Secret | Purpose |
|--------|---------|
| `CRUMPET_ACCOUNT_SSH_KEY` | The **private** SSH key for the `bcf-web` account on crumpet. The matching **public** key must be present in `~bcf-web/.ssh/authorized_keys` on the server. |

Set this under **Settings → Secrets and variables → Actions** (the workflow uses the
`local` environment, so it can also live as an environment secret there).

## Server-side prerequisites

For a deploy to succeed, the following must be true on `crumpet.amphora.cloud`:

- The public half of `CRUMPET_ACCOUNT_SSH_KEY` is in `~bcf-web/.ssh/authorized_keys`.
- `bcf-web` can write to `~/public_html`.
- SSH is reachable on port `1970` (firewall / `sshd` configuration).
- A web server is configured to serve `~bcf-web/public_html`.

## Migration from Tailscale

This pipeline previously authenticated the runner onto a Tailscale tailnet and
rsynced to `bcf-dev@bcf-production-common.anteater-catfish.ts.net:/home/bcf-dev/html/`.
Tailscale has been retired for this site. As a result:

- The `Setup Tailscale` step (action `tailscale/github-action@v3`) was removed.
- The `TAILSCALE_CLIENT_ID` and `TAILSCALE_CLIENT_SECRET` secrets are no longer used
  and can be deleted from the repository once the new deploy is confirmed working.
- The old `bcf-production-common` host is no longer a deploy target.

## Status — what's working

- ✅ **Workflow updated** — `main.yml` no longer references Tailscale; it materialises
  the SSH key and rsyncs to crumpet on port 1970 into `public_html`. The file is
  valid YAML.
- ➖ **Build step** — unchanged by this work. `npm run build` outputs the static site
  to `./dist/`, which is the payload rsync ships.
- ⏳ **End-to-end deploy** — confirmed once a push to `main` runs the `Set up SSH key`
  and `Deploy Site` steps successfully and the live site serves from crumpet. This
  depends on the secret and server-side prerequisites above being in place.

## Verifying a deploy

- Watch the run under the repository's **Actions** tab. The `Deploy Site` step runs
  rsync with `-vv`, so its log lists every transferred file.
- Optional dry run from a machine that has the key and access (shows what would
  transfer without writing):

  ```bash
  rsync -avn --delete \
    -e 'ssh -i <key> -p 1970 -o StrictHostKeyChecking=no' \
    dist/ bcf-web@crumpet.amphora.cloud:public_html/
  ```
