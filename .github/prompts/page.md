# Next.js Page Template

Generate a Next.js App Router page following project conventions:

## Requirements
- TypeScript with strict typing
- Export `metadata` object for SEO (title, description)
- Server Component (default)
- Use Tailwind CSS for layout and styling
- Responsive design with mobile-first approach
- Support dark mode throughout
- Use Geist Sans font (already configured globally)

## Page Details
- **Route**: `app/{{route}}/page.tsx`
- **Title**: {{page_title}}
- **Description**: {{page_description}}
- **Content**: {{content_requirements}}

## Layout Pattern
Follow the established pattern from `app/page.tsx`:
```tsx
<div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
  <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black">
    {/* Page content here */}
  </main>
</div>
```

## Metadata Template
```tsx
export const metadata: Metadata = {
  title: "{{page_title}}",
  description: "{{page_description}}",
};
```
