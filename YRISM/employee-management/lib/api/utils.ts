export const createUrlWithSearchParams = (
  url: string,
  params?: Record<string, any>
) => {
  if (!params) return url;
  const sParams = new URLSearchParams(params);

  Object.keys(params).forEach((key) => {
    sParams.set(key, encodeURIComponent(params[key]));
  });

  return `${url}?${sParams.toString()}`;
};

export const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_PAGE_NUMBER = 1;
