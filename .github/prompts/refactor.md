# Code Refactoring Guidelines

Refactor the selected code following project best practices:

## Refactoring Principles
1. **Type Safety**: Add or improve TypeScript types
2. **Component Structure**: Break large components into smaller, reusable pieces
3. **Performance**: Use Server Components when possible, minimize client-side JavaScript
4. **Styling**: Consolidate repeated Tailwind classes into consistent patterns
5. **Accessibility**: Add ARIA labels, semantic HTML, keyboard navigation
6. **Readability**: Extract complex logic into named functions

## Specific Checks
- [ ] Remove unused imports and variables
- [ ] Replace inline styles with Tailwind utilities
- [ ] Ensure dark mode support on all colored elements
- [ ] Use `next/image` instead of `<img>` tags
- [ ] Add `"use client"` only if absolutely necessary
- [ ] Use `@/*` path alias for internal imports
- [ ] Extract magic numbers/strings into constants
- [ ] Add JSDoc comments for exported functions

## Focus Areas
{{focus_areas}}

## Expected Outcome
{{expected_outcome}}
