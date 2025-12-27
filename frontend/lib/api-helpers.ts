// Helper functions for API calls with authentication

export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("admin_auth")
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  }
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }
  
  const response = await fetch(endpoint, {
    ...options,
    headers,
  })
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }))
    throw new Error(error.error || "Request failed")
  }
  
  return response.json()
}

