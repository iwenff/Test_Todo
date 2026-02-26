export interface HttpError extends Error {
  status?: number;
}

export interface RequestOptions extends RequestInit {
  signal?: AbortSignal;
}

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function http<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const controller = new AbortController();
  const signal = options.signal ?? controller.signal;

  const { headers, ...rest } = options;

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...rest,
      signal,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        ...(headers ?? {}),
      },
    });

    if (!response.ok) {
      const error: HttpError = new Error(`HTTP error ${response.status}`);
      error.status = response.status;
      throw error;
    }

    if (response.status === 204) {
      return undefined as unknown as T;
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      const abortError: HttpError = new Error("Request aborted");
      abortError.name = "AbortError";
      throw abortError;
    }
    throw error;
  }
}
