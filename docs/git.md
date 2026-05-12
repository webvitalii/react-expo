# Git Cheat Sheet

Quick reference for the commands used most often in this project. The
husky hooks (`pre-commit` runs lint-staged, `pre-push` runs `i18n:check`)
mean a few `--no-verify` and `--dry-run` flags show up here too.

## Inspecting state

```bash
# Show modified, staged, and untracked files
git status

# Short, condensed status (one line per file)
git status -s

# Show unstaged changes
git diff

# Show changes already added to the index
git diff --staged

# Show the contents of a single commit
git show <sha>

# Last 10 commits, one per line
git log -n 10 --oneline

# Last 10 commits with the files each one touched
git log -n 10 --oneline --stat

# Full history of a single file
git log -p -- path/to/file

# Who changed each line of a file, and when
git blame path/to/file
```

## Staging & committing

```bash
# Stage every change in the working tree
git add .

# Stage a single file (or pattern)
git add path/to/file

# Stage interactively, hunk by hunk
git add -p

# Commit staged changes with a message
git commit -m "Message"

# Commit and bypass the pre-commit hook (lint-staged)
git commit -m "Message" --no-verify

# Amend the previous commit (keep the same message)
git commit --amend --no-edit

# Amend the previous commit and rewrite the message
git commit --amend -m "New message"
```

## Branching

```bash
# List local branches (current one is starred)
git branch

# List local + remote branches
git branch -a

# Create and switch to a new branch
git switch -c feature/my-thing

# Switch to an existing branch
git switch main

# Delete a fully-merged local branch
git branch -d feature/my-thing

# Force-delete an unmerged local branch
git branch -D feature/my-thing

# Rename the current branch
git branch -m new-name
```

## Sync with remote

```bash
# Download all remote changes without merging, prune deleted remote branches
git fetch --all --prune

# Pull and rebase your local commits on top (avoids merge commits)
git pull --rebase

# Push the current branch
git push

# First push of a new branch (sets upstream)
git push -u origin feature/my-thing

# Bypass the pre-push hook (i18n:check)
git push --no-verify

# Show what a push would do, without actually pushing
git push --dry-run

# Force-push safely: refuses if remote has commits you haven't seen
git push --force-with-lease
```

## Undoing changes

```bash
# Discard unstaged changes in a file
git restore path/to/file

# Discard ALL unstaged changes in the working tree
git restore .

# Unstage a file (keep the changes in the working tree)
git restore --staged path/to/file

# Revert a pushed commit by creating a new commit that undoes it
git revert <sha>

# Reset the current branch to a previous commit, keeping changes unstaged
git reset <sha>

# Reset hard: discard all local changes and move HEAD to <sha>  (DANGEROUS)
git reset --hard <sha>

# Remove untracked files and directories  (DANGEROUS)
git clean -fd

# Preview what `git clean -fd` would delete, without doing it
git clean -fdn
```

## Stashing

```bash
# Save uncommitted changes (tracked files) and revert to a clean tree
git stash

# Same, but include untracked files
git stash -u

# List all stashes
git stash list

# Reapply the most recent stash and remove it from the list
git stash pop

# Reapply the most recent stash but keep it in the list
git stash apply

# Drop the most recent stash without applying it
git stash drop
```

## Bypassing husky hooks

This project enforces two hooks. Bypass only when you have a reason
(WIP commit, emergency hotfix); regular pushes should pass cleanly.

```bash
# Skip pre-commit (lint-staged)
git commit -m "Message" --no-verify

# Skip pre-push (i18n:check)
git push --no-verify
```
