import { Id, ToastContent, ToastOptions, toast } from "react-toastify";

interface FetchApiOptions {
  url: string;
  method?: string;
  body?: any;
  hasShowErrorToast?: boolean;
}

export async function fetchApi({ url, method = "GET", body, hasShowErrorToast = true }: FetchApiOptions) {
  let headers: any = {};
  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  if (method !== "GET") {
    const csrfCookie = document.cookie.split("; ").find((row) => row.startsWith("csrftoken"));
    const csrfToken = csrfCookie ? csrfCookie.split("=")[1] : "";
    headers["X-CSRFToken"] = csrfToken;
  }

  const response = await fetch(url, {
    method: method,
    body: body,
    headers: headers,
  });

  if (response.ok) {
    if (response.status == 204) {
      return null;
    } else {
      return await response.json();
    }
  }

  const toastOptions: ToastOptions = { theme: "colored", position: "bottom-center" };
  if (response.status >= 400 && response.status < 500) {
    const error = await response.json();
    showErrorToast(hasShowErrorToast, error.detail, toastOptions);
  } else {
    showErrorToast(hasShowErrorToast, "Unexpected error", toastOptions);
  }
  throw response;
}

function showErrorToast(
  hasShowErrorToast: boolean,
  content: ToastContent<unknown>,
  options?: ToastOptions<{}> | undefined
): Id | null {
  if (hasShowErrorToast) {
    return toast.error(content, options);
  }
  return null;
}
