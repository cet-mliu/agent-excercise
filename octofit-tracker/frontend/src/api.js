const codespaceName = import.meta.env.VITE_CODESPACE_NAME

// Fall back to localhost so we never build a broken "https://undefined-8000..." URL.
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

if (!codespaceName) {
  console.warn(
    'VITE_CODESPACE_NAME is not set. Falling back to ' +
      `${API_BASE_URL}. Define VITE_CODESPACE_NAME in .env.local to target your Codespace API.`,
  )
}

export async function fetchCollection(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status} ${response.statusText}`)
  }
  const data = await response.json()
  // Support both paginated ({ results: [...] }) and plain array responses.
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.results)) return data.results
  return []
}
