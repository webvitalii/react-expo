# Performance: Added Husky + lint-staged

## Oxlint:

```bash
$ git commit -m "Added husky and lint-staged"
[STARTED] Backing up original state...
[COMPLETED] Backed up original state in git stash (16728d9)
[STARTED] Running tasks for staged files...
[STARTED] package.json — 3 files
[STARTED] *.{js,jsx,ts,tsx} — 0 files
[STARTED] *.{json,md,css,html,yml,yaml} — 2 files
[SKIPPED] *.{js,jsx,ts,tsx} — no files
[STARTED] oxfmt
[COMPLETED] oxfmt
[COMPLETED] *.{json,md,css,html,yml,yaml} — 2 files
[COMPLETED] package.json — 3 files
[COMPLETED] Running tasks for staged files...
[STARTED] Applying modifications from tasks...
[COMPLETED] Applying modifications from tasks...
[STARTED] Cleaning up temporary files...
[COMPLETED] Cleaning up temporary files...
[main fb60400] Added husky and lint-staged
 3 files changed, 460 insertions(+), 1 deletion(-)
 create mode 100644 .husky/pre-commit
```
