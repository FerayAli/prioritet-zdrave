# Repository setup

This document describes how this project is initialized with Git and how remotes are handled.

## Local clone path

`/home/default/Projects/prioritet-zdrave`

## Git identity (project only)

Commits in **this** repository use a **local** author identity. Global `~/.gitconfig` is not modified.

| Setting | Value |
|---------|--------|
| `user.name` | `feray.ali` |
| `user.email` | `feray.ali.dev@gmail.com` |

Verify:

```bash
git config --local --list | grep '^user\.'
```

Re-apply after a fresh clone if needed:

```bash
cd /home/default/Projects/prioritet-zdrave
git config --local user.name "feray.ali"
git config --local user.email "feray.ali.dev@gmail.com"
```

## Initialize repository

If `.git` does not exist yet:

```bash
cd /home/default/Projects/prioritet-zdrave
git init
git checkout -b main   # or: git branch -M main after first commit on older Git
```

Default branch: **`main`**.

## Remote (GitHub)

Intended remote:

- **HTTPS:** `https://github.com/FerayAli/prioritet-zdrave.git`
- **SSH:** `git@github.com:FerayAli/prioritet-zdrave.git`

Add when you are ready to sync (does not push by itself):

```bash
git remote add origin https://github.com/FerayAli/prioritet-zdrave.git
git remote -v
```

### Push policy

- Do **not** push until explicitly requested.
- This repo started as a **clean slate**; the first push may require choosing between a new history and the existing GitHub history (`main` vs `master`, force push, or a new branch). Decide that before the first `git push`.

## Ignored paths

See [`.gitignore`](../.gitignore) at the repo root (`node_modules`, `.next`, `.env*`, etc.).

## Related docs

| Document | Purpose |
|----------|---------|
| [`mvp_plan.md`](mvp_plan.md) | Product MVP (when added) |
| [`visual-phase-1.md`](visual-phase-1.md) | Homepage visual spec (when added) |
| [`technical-architecture.md`](technical-architecture.md) | Implementation architecture (after visual sign-off) |
