import { auth } from "./firebase";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  // Wait for Firebase to finish restoring the login session before
  // checking who's logged in — fixes 401s caused by reading auth state too early.
  await auth!.authStateReady();

  const user = auth!.currentUser;
  const token = user ? await user.getIdToken() : null;

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Network error — check your connection and try again.");
  }

  let json: ApiResponse<T>;
  try {
    json = await res.json();
  } catch {
    // The server returned something that isn't JSON (a host's own 404/500
    // HTML page, a proxy error, etc.) — surface a readable message instead
    // of a raw "Unexpected token <" parse error.
    throw new Error(
      res.ok
        ? "Something went wrong. Please try again."
        : `Request failed (${res.status}). Please try again.`,
    );
  }

  if (!json.success) {
    throw new Error(json.error || "Something went wrong");
  }

  return json.data as T;
}

// Separate from `request` because it must NOT send a JSON Content-Type —
// the browser needs to set its own multipart boundary for FormData.
async function upload<T>(path: string, file: File): Promise<T> {
  await auth!.authStateReady();
  const user = auth!.currentUser;
  const token = user ? await user.getIdToken() : null;

  const formData = new FormData();
  formData.append("file", file);

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: formData,
    });
  } catch {
    throw new Error("Network error — check your connection and try again.");
  }

  let json: ApiResponse<T>;
  try {
    json = await res.json();
  } catch {
    throw new Error(
      res.ok
        ? "Something went wrong. Please try again."
        : `Request failed (${res.status}). Please try again.`,
    );
  }

  if (!json.success) {
    throw new Error(json.error || "Something went wrong");
  }

  return json.data as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: "PATCH", body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
  upload: <T>(path: string, file: File) => upload<T>(path, file),
};