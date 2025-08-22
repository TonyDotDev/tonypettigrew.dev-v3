# Commit Message Guidelines

## Conventional Commits Format

### Commit Message Format:

```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

### Valid Types:

- **`feat`**: For commits that add new functionality
- **`fix`**: For commits that fix bugs/errors
- **`docs`**: For commits that add or update documentation
- **`style`**: For commits that fix formatting, missing semicolons, etc. (no functional changes)
- **`refactor`**: For commits that refactor code (no functional changes)
- **`perf`**: For commits that improve performance
- **`test`**: For commits that add or update tests
- **`chore`**: For commits that complete routine/automated tasks (upgrading dependencies, etc.)
- **`ci`**: For commits that update CI/CD configuration
- **`build`**: For commits that affect the build system or external dependencies
- **`revert`**: For commits that revert previous commits

### Breaking Changes:

- Append `!` after the type for breaking changes
- Example: `fix!: return type of workspace.paste`
- Breaking changes require careful consideration as they may break developers using your code

### Description Requirements:

- Must be non-empty and under 256 characters
- Use imperative mood ("Add feature" not "Added feature")
- Be concise and descriptive
- Keep under 50 characters for the subject line
- Keep description under 72 characters when possible

### Body and Footer:

- Optional but recommended for complex changes
- Must be broken into lines of no more than 256 characters
- Include blank line between description and body
- Include blank line between body and footer

## Examples

### Feature Commits:

```
feat: add compound component pattern for blog with shared context

feat(auth): implement OAuth2 authentication flow

feat(ui): add dark mode toggle component
```

### Bug Fixes:

```
fix: resolve search debouncing issue in BlogSearch component

fix(api): handle null response from external API

fix!: change API return type for better type safety
```

### Documentation:

```
docs: update README with new installation instructions

docs(api): add JSDoc comments to all public functions

docs: fix typo in contributing guidelines
```

### Code Style:

```
style: fix formatting in BlogList component

style: remove trailing whitespace

style: standardize import order
```

### Refactoring:

```
refactor: extract search logic into custom hook

refactor(utils): simplify date formatting function

refactor: rename variables for better clarity
```

### Performance:

```
perf: optimize image loading with lazy loading

perf: reduce bundle size by removing unused dependencies

perf: implement memoization for expensive calculations
```

### Testing:

```
test: add unit tests for BlogContext

test: add integration tests for search functionality

test: fix flaky test in user authentication
```

### Maintenance:

```
chore: update dependencies to latest versions

chore: add pre-commit hooks

chore: configure ESLint rules
```

### CI/CD:

```
ci: add automated testing pipeline

ci: configure deployment to staging environment

ci: fix build script for Windows compatibility
```

### Build:

```
build: update webpack configuration

build: add source maps for development

build: optimize production build process
```

### Reverts:

```
revert: "feat: add experimental feature"

revert: "fix: resolve authentication bug"
```

## Fixing Non-Conventional Commits

### Multiple Commits:

Edit the pull request title to conform to requirements. When the pull request is merged, your other commits will be squashed so that the title becomes the commit message.

### Single Commit:

Use `git commit --amend` then `git push --force origin branch-name`:

```bash
git commit --amend -m "feat: add new feature"
git push --force origin feature-branch
```

## Best Practices

### Write Clear Descriptions:

- Use imperative mood ("Add feature" not "Added feature")
- Be specific about what changed
- Focus on the "what" and "why" not the "how"

### Use Scopes When Helpful:

- Scopes help categorize changes
- Use lowercase and hyphens for multi-word scopes
- Examples: `feat(auth)`, `fix(ui)`, `docs(api)`

### Include Breaking Changes:

- Always mark breaking changes with `!`
- Explain the breaking change in the body
- Provide migration instructions if possible

### Keep Commits Atomic:

- Each commit should represent one logical change
- Don't mix different types of changes in one commit
- Use multiple commits for complex features

## References

- [Google Blockly Commit Guide](https://developers.google.com/blockly/guides/contribute/get-started/commits)
- [Conventional Commits Cheatsheet](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)
