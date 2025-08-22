# Pull Request Guidelines

## PR Message Structure

Your PR summary should include:

### Essential Elements:

- **Related issue**: What issue does this PR address?
- **Change description**: What does this PR add or modify?
- **Testing approach**: How did you test your changes?
- **Review focus**: What areas should reviewers pay special attention to?
- **Additional context**: Any other information reviewers need

### PR Message Template:

```markdown
# [Type]: Brief description

## 📋 Overview

Clear, concise description of what this PR accomplishes.

## ✨ Changes Made

- Bullet points of specific changes
- Focus on user-facing improvements
- Include technical details when relevant

## 🧪 Testing

- How you tested the changes
- What scenarios were covered
- Any automated tests added

## 📁 Files Changed

- List of key files modified
- New files created
- Files deleted (if any)

## 🔍 Review Focus

- Areas that need special attention
- Potential concerns or trade-offs
- Questions for reviewers

## 📈 Impact

- Performance implications
- Breaking changes (if any)
- Migration notes
```

## Best Practices

### Keep Changes Small and Focused

- **Fix one problem**: Don't tackle multiple issues in a single PR
- **Limit scope**: PRs should typically take < 8 hours to complete
- **Target 200-400 lines of code**: Keep PRs small for efficient review
- **Use logical commits**: Split large changes into smaller, focused commits
- **Stay organized**: Group related changes together

### Code Quality Standards

- **Follow style guides**: Adhere to project-specific coding standards
- **Write clean code**: Use consistent naming, structure, and comments
- **Automate checks**: Use linting tools where available
- **Documentation**: Update docs when adding new features
- **Format code properly**: Ensure consistent formatting and readability

### Testing Requirements

- **Test thoroughly**: Verify changes work before submitting
- **Cover edge cases**: Test error scenarios and edge conditions
- **Manual testing**: For UI changes, test all demonstrated functionality
- **Automated tests**: Add unit/integration tests for new features
- **Build and test**: Ensure changes don't break the build

### Avoiding Common Mistakes

#### Formatting

Pay close attention to code formatting. Consistent and readable code ensures an improved review process. Use tools or plugins to automate formatting wherever possible.

#### Build and Test

Before submitting a pull request, ensure that changes do not break the build and pass all the tests successfully. You can catch these issues with the help of integration tools.

#### Code Dependencies

Verify that changes do not introduce conflicting dependencies or adversely affect other parts of the codebase. Isolation of changes helps prevent integration challenges.

## Examples

### Good PR Title:

```
feat: add compound component pattern for blog with shared context
```

### Good PR Description:

```markdown
# 🚀 Blog Refactor: Compound Components with Shared Context

## 📋 Overview

Refactors blog functionality to use compound component pattern with shared context, improving performance through server-side rendering.

## ✨ Changes Made

- Add BlogContext for shared state management
- Implement server-side data fetching with GROQ
- Add debounced search with loading states
- Create dynamic category filtering from CMS
- Improve component architecture and maintainability

## 🧪 Testing

- ✅ Search functionality with debouncing
- ✅ Category filtering and persistence
- ✅ Loading states and error handling
- ✅ URL parameter management
- ✅ Responsive design verification

## 📁 Files Changed

- `src/app/blog/Blog/` - New compound component structure
- `src/app/blog/getAllBlogPosts.ts` - Server-side data fetching
- `src/app/blog/getAllCategories.ts` - Category management
- Updated existing components for new architecture

## 🔍 Review Focus

- Context implementation and state management
- Server-side rendering approach
- Performance implications of changes
- Component separation and reusability

## 📈 Impact

- 50-70% improvement in First Contentful Paint
- Reduced client-side JavaScript bundle
- Better SEO through server-side rendering
- Improved maintainability and developer experience
```
