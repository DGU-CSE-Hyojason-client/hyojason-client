export const requester = async <B>(
  method: "post" | "get",
  uri: string,
  body: B,
  headers: HeadersInit = {}
) => {
  let init: RequestInit = { method, headers: setHeaders(headers) };

  if (method === "post") {
    init = { ...init, body: JSON.stringify(body) };
  }

  return fetch(uri, init);
};

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const setHeaders = (headers: HeadersInit): HeadersInit => {
  if (localStorage.jwt) {
    return {
      ...defaultHeaders,
      ...headers,
      Authorization: `Bearer ${localStorage.jwt}`,
    };
  } else {
    return { ...defaultHeaders, ...headers };
  }
};
