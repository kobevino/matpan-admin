# Commit Changes

Generate a commit message following conventional commits and commitlint rules.

## Instructions

Analyze staged changes and create a properly formatted commit message that passes commitlint validation.

## Commit Types

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Changes that do not affect the meaning of the code (white-space, formatting, etc) |
| `refactor` | A code change that neither fixes a bug nor adds a feature |
| `perf` | A code change that improves performance |
| `test` | Adding missing tests or correcting existing tests |
| `build` | Changes that affect the build system or external dependencies |
| `ci` | Changes to CI configuration files and scripts |
| `chore` | Other changes that don't modify src or test files |
| `revert` | Reverts a previous commit |

## Format Rules

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

**Requirements:**
- `type`: Required, must be lowercase
- `scope`: Optional, in parentheses (e.g., `feat(auth):`)
- `description`: Required, lowercase start, no period at end, max 100 chars
- `body`: Optional, blank line before, max 100 chars per line
- `footer`: Optional, blank line before, for references (e.g., `Fixes #123`)

## Examples

**Good:**
```
feat: add user authentication system
fix(api): resolve null pointer in user service
docs: update README with installation steps
refactor: simplify error handling logic
test: add unit tests for auth module
```

**Bad (will fail commitlint):**
```
Add authentication          # missing type
FEAT: add auth              # type must be lowercase
feat add auth               # missing colon
feat: Add auth.             # uppercase start, ends with period
```

## Steps

1. Run `git status` to see all changed files
2. Run `git diff --staged` to see staged changes (if any)
3. Run `git diff` to see unstaged changes
4. Analyze the changes and determine the appropriate commit type
5. Write a concise description that explains "what" and "why"
6. Stage the relevant files with `git add`
7. Create the commit with the generated message
8. Verify the commit was successful with `git status`
