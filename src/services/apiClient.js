export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "https://cinexflix-gq2n.onrender.com/api";

export const DASHBOARD_URL =
  import.meta.env.VITE_DASHBOARD_URL ?? "https://cinexflix-gq2n.onrender.com:8055";

export const CLOUDINARY_UPLOAD_URL =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_URL ??
  "https://api.cloudinary.com/v1_1/doacvhdgt/image/upload";

const JSON_HEADERS = { "Content-Type": "application/json" };

async function readResponse(response) {
  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
}

export function buildQuery(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

export async function apiRequest(path, options = {}) {
  const isFormData = options.body instanceof FormData;
  const headers = isFormData
    ? options.headers
    : { ...JSON_HEADERS, ...options.headers };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
  const data = await readResponse(response);

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error?.message ||
      (typeof data === "string" && data) ||
      `Error HTTP ${response.status}`;
    throw new Error(message);
  }

  return data;
}
