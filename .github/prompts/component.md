# React Component Template

Generate a React component following the project conventions:

## Requirements
- TypeScript with strict typing and explicit prop interfaces
- **Server Component by default** - only add `"use client"` if using hooks/events
- Use Tailwind CSS utility classes for all styling
- Support dark mode with `dark:` prefix classes
- Import from `@/*` path alias when needed
- Use `next/image` for any images
- Responsive design with mobile-first approach (`sm:`, `md:` breakpoints)

## Component Details
- **Name**: {{component_name}}
- **Location**: `app/components/{{component_name}}.tsx`
- **Description**: {{description}}
- **Props**: {{props}}

## Styling Guidelines
- Background colors: Use `bg-white dark:bg-black` or `bg-zinc-50 dark:bg-zinc-900`
- Text colors: Use `text-black dark:text-zinc-50` or `text-zinc-600 dark:text-zinc-400`
- Apply `antialiased` for better text rendering
- Use semantic spacing (gap, padding) with Tailwind utilities

## Example Usage
```tsx
import {{component_name}} from '@/app/components/{{component_name}}'

<{{component_name}} {...props} />
```
