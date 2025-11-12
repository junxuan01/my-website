# Next.js API Route Template

Generate a Next.js 16 App Router API route with proper TypeScript types and error handling:

## Requirements
- TypeScript with explicit types for request/response
- Use Next.js `NextRequest` and `NextResponse` types
- Proper HTTP status codes (200, 400, 500, etc.)
- Try-catch error handling
- CORS headers if needed for external access
- Input validation before processing

## Route Details
- **Path**: `app/api/{{route_path}}/route.ts`
- **HTTP Method**: {{http_method}} (GET, POST, PUT, DELETE, PATCH)
- **Purpose**: {{purpose}}
- **Request Body Schema**: {{request_schema}}
- **Response Schema**: {{response_schema}}

## Basic Structure
```tsx
import { NextRequest, NextResponse } from 'next/server'

export async function {{HTTP_METHOD}}(request: NextRequest) {
  try {
    // Input validation
    // Business logic
    // Return response
    return NextResponse.json(
      { data: result },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in {{route_path}}:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## Error Handling
- 400: Bad Request (invalid input)
- 401: Unauthorized (missing auth)
- 404: Not Found (resource doesn't exist)
- 500: Internal Server Error (unexpected errors)
