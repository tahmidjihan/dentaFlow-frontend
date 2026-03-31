'use client';
import { toast } from 'sonner';

// Use relative URL - rewrites in next.config.ts will handle proxying to backend
// This ensures cookies are sent correctly for authentication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export interface FetchOptions extends RequestInit {
  /** Whether to show error toast on failure */
  showToast?: boolean;
  /** Custom error message */
  errorMessage?: string;
}

export interface FetchError extends Error {
  status?: number;
  code?: string;
  details?: unknown;
}

/**
 * Centralized fetch function for all API calls
 * Handles authentication, error handling, and response parsing
 */
export async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const {
    showToast = true,
    errorMessage,
    headers = {},
    ...restOptions
  } = options;

  const url = `${API_BASE_URL}${endpoint}`;
  console.log(url);

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...restOptions,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    credentials: 'include', // Include cookies for auth
  };

  try {
    const response = await fetch(url, config);

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error: FetchError = new Error(
        errorMessage ||
          errorData.error ||
          `Request failed with status ${response.status}`,
      );
      error.status = response.status;
      error.code = errorData.code;
      error.details = errorData.details;

      if (showToast) {
        toast.error(error.message);
      }

      throw error;
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    // Parse and return response
    const data = await response.json();
    return data as T;
  } catch (error) {
    // Network errors or other fetch failures
    if (error instanceof Error && !(error as FetchError).status) {
      const fetchError: FetchError = error as FetchError;
      fetchError.message = errorMessage || 'Network error. Please try again.';
      fetchError.code = 'NETWORK_ERROR';

      if (showToast) {
        toast.error(fetchError.message);
      }

      throw fetchError;
    }

    throw error;
  }
}

/**
 * GET request helper
 */
export function get<T>(endpoint: string, options?: FetchOptions) {
  return fetchAPI<T>(endpoint, { ...options, method: 'GET' });
}

/**
 * POST request helper
 */
export function post<T>(
  endpoint: string,
  data?: unknown,
  options?: FetchOptions,
) {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request helper
 */
export function put<T>(
  endpoint: string,
  data?: unknown,
  options?: FetchOptions,
): Promise<T> {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request helper
 */
export function del<T>(endpoint: string, options?: FetchOptions): Promise<T> {
  return fetchAPI<T>(endpoint, { ...options, method: 'DELETE' });
}

/**
 * PATCH request helper
 */
export function patch<T>(
  endpoint: string,
  data?: unknown,
  options?: FetchOptions,
): Promise<T> {
  return fetchAPI<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  });
}
