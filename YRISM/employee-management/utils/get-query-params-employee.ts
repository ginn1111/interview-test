import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@/lib/api/utils';

export const getQueryParamsEmployee = (searchParams: URLSearchParams) => {
  const _pageNumber = searchParams.get('pageNumber');
  const _pageSize = searchParams.get('pageSize');

  const pageNumber =
    !_pageNumber || isNaN(_pageNumber as any)
      ? DEFAULT_PAGE_NUMBER
      : Number(_pageNumber as any);

  const pageSize =
    !_pageSize || isNaN(_pageSize as any)
      ? DEFAULT_PAGE_SIZE
      : Number(_pageSize as any);

  const q = searchParams.get('search')?.trim() || '';

  const _start = (pageNumber - 1) * pageSize;
  const _end = pageNumber * pageSize;

  return {
    q,
    _start,
    _end,
    pageSize,
    pageNumber,
  };
};
