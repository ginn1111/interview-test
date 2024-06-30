import { useMemo } from 'react';

const ANCHOR = 1970;

const useFromToYear = (fromYear: number = ANCHOR) => {
  const yearsFromOptions = useMemo(
    () =>
      Array.from(Array(new Date().getFullYear() - ANCHOR + 1), (_, idx) => {
        const year = ANCHOR + idx;
        return {
          label: year,
          value: year,
        };
      }),
    []
  );

  const yearsToOptions = useMemo(
    () =>
      Array.from(Array(new Date().getFullYear() - fromYear + 1), (_, idx) => {
        const year = fromYear + idx;
        return {
          label: year,
          value: year,
        };
      }),

    [fromYear]
  );

  return {
    yearsFromOptions,
    yearsToOptions,
  };
};

export default useFromToYear;
