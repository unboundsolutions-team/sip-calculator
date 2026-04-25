# Git rollback workflow

This repo already had Git history. The setup below makes it easier to inspect old code and recover quickly if an AI-assisted change causes a failure.

## What is set up

- `main` is the normal branch for the current worktree.
- `production-safe-2026-04-06` is a recovery tag pointing at the current known code state.
- Helper commands are available through `npm` scripts.

## See previous code

```powershell
npm run git:history
git show production-safe-2026-04-06
git show <commit>
```

## Create a safe snapshot before AI changes

```powershell
npm run git:snapshot
```

You can also provide your own name:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/git-snapshot.ps1 -Name production-safe-before-ai-fix
```

## Restore a previous version safely

This creates a new branch from the target instead of rewriting `main`.

```powershell
npm run git:restore -- production-safe-2026-04-06
```

You can also restore from any commit:

```powershell
npm run git:restore -- 3eddff9
```

## Recommended workflow for AI changes

1. Create a snapshot tag before asking AI to change production code.
2. Make AI changes on a separate branch.
3. Test the branch with `npm run build`.
4. If the change is good, merge it into `main`.
5. If it fails, restore the last safe tag into a recovery branch and deploy that version.

## Fast manual commands

```powershell
git branch ai/sandbox
git switch ai/sandbox
git switch main
git tag
git log --oneline --decorate --graph --all
```

## Important note

If a bad AI change has already been pushed to a shared branch, prefer `git revert` over `git reset --hard` so history stays safe for everyone.
