# GitHub Integration

This project includes a secure backend API for fetching GitHub repositories, even though the GitHub API endpoint `/users/{username}/repos` is public and doesn't require authentication.

## Why Use a Backend Endpoint?

Even though the GitHub API is public, there are several important reasons to use a backend endpoint:

### Security Benefits

1. **Rate Limiting Control**: GitHub's API has strict rate limits (60 requests/hour for unauthenticated requests, 5000/hour for authenticated). Our backend implements additional rate limiting to prevent abuse.

2. **Input Validation**: All query parameters are validated server-side to prevent malicious requests.

3. **Data Filtering**: Sensitive repository information is filtered out before sending to the client.

4. **Error Handling**: Centralized error handling with appropriate HTTP status codes.

5. **Caching**: Server-side caching reduces API calls and improves performance.

### Architectural Benefits

1. **Consistent API**: Provides a consistent interface regardless of GitHub API changes.

2. **Data Transformation**: Can transform and enrich data before sending to the client.

3. **Monitoring**: Server-side logging for debugging and monitoring.

4. **Future-Proofing**: Easy to add authentication, caching, or other features later.

## Setup

### Environment Variables

Add these variables to your `.env.local` file:

```env
# Required
GITHUB_USERNAME=your_github_username

# Optional - for higher rate limits and private repos
GITHUB_TOKEN=your_github_personal_access_token
```

### GitHub Token (Optional)

If you want to access private repositories or need higher rate limits:

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with `repo` scope
3. Add the token to your environment variables

## API Endpoint

### GET `/api/github/repos`

Fetches repositories for the configured GitHub user.

#### Query Parameters

- `featured` (optional): Boolean to return featured repos instead of pinned repos (default: false)

#### Example Request

```bash
# Get pinned repos (default)
curl "http://localhost:3000/api/github/repos"

# Get featured repos
curl "http://localhost:3000/api/github/repos?featured=true"
```

````

#### Example Response

```json
{
  "repos": [
    {
      "id": 123456789,
      "name": "my-awesome-project",
      "full_name": "username/my-awesome-project",
      "description": "A fantastic project description",
      "html_url": "https://github.com/username/my-awesome-project",
      "stargazers_count": 42,
      "forks_count": 10,
      "language": "TypeScript",
      "topics": ["typescript", "react", "nextjs"],
      "private": false,
      "fork": false,
      "created_at": "2023-01-01T00:00:00Z",
      "updated_at": "2023-12-01T00:00:00Z",
      "pushed_at": "2023-12-01T00:00:00Z",
      "homepage": "https://myproject.com",
      "archived": false,
      "license": {
        "key": "mit",
        "name": "MIT License",
        "url": "https://api.github.com/licenses/mit"
      }
    }
  ],
  "total": 1,
  "page": 1,
  "per_page": 30
}
````

## Usage in Components

### Using the Hook

```tsx
import { useGitHubRepos } from "@/app/hooks";

function MyComponent() {
  const { repos, isLoading, error } = useGitHubRepos({
    per_page: 6,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {repos.map((repo) => (
        <div key={repo.id}>
          <h3>{repo.name}</h3>
          <p>{repo.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Using the Component

```tsx
import { GitHubRepos } from "@/app/components/GitHubRepos";

function MyPage() {
  return (
    <div>
      <h2>Featured Projects</h2>
      <GitHubRepos maxRepos={6} />
    </div>
  );
}
```

## Security Features

### Input Validation

- All query parameters validated with Zod schemas
- Type-safe parameter handling
- Malicious input prevention

### Data Sanitization

- Sensitive fields removed from responses
- Safe data transformation
- No exposure of internal API details

### Error Handling

- Proper HTTP status codes
- Safe error messages (no internal details)
- Comprehensive logging for debugging

## Monitoring and Debugging

### Logging

The API logs all requests and errors for monitoring:

```typescript
// Log successful requests
console.log(`GitHub repos fetched: ${repos.length} repos`);

// Log errors with context
console.error("GitHub API error:", response.status, errorText);
```

### Rate Limit Monitoring

Track rate limit usage:

```typescript
// Check current rate limit status
const isRateLimited = !checkRateLimit(clientIP);
if (isRateLimited) {
  console.warn(`Rate limit exceeded for IP: ${clientIP}`);
}
```

## Future Enhancements

### Potential Additions

1. **Authentication**: Add user authentication for personalized repos
2. **Advanced Caching**: Redis-based caching for better performance
3. **Webhooks**: Real-time updates when repos change
4. **Analytics**: Track popular repos and languages
5. **Search**: Full-text search across repository descriptions

### Performance Optimizations

1. **Pagination**: Efficient pagination for large repo lists
2. **Lazy Loading**: Load repos on demand
3. **Image Optimization**: Optimize repository images
4. **CDN**: Use CDN for static assets

## Troubleshooting

### Common Issues

1. **Rate Limit Exceeded**: Wait for rate limit to reset or add GitHub token
2. **Invalid Username**: Check `GITHUB_USERNAME` environment variable
3. **Network Errors**: Check internet connection and GitHub API status
4. **CORS Issues**: Ensure requests are made to the correct domain

### Debug Mode

Enable debug logging by setting `NODE_ENV=development`:

```bash
NODE_ENV=development npm run dev
```

This will show detailed logs for API requests and responses.
