import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

type UseFetch = {
  isInitFetch?: boolean;
  fetchFn: (...args: any) => Promise<any>;
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (data: AxiosError) => void;
};

const useFetch = (props: UseFetch) => {
  const { isInitFetch = true, fetchFn, onSuccess, onError } = props;

  const [data, setData] = useState(null);
  const [error, setError] = useState<AxiosError | Error | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async (...args: any) => {
    try {
      setLoading(true);
      const response = await fetchFn(...args);
      setData(response.data);
      onSuccess?.(response.data);
    } catch (err) {
      setError(err as Error);
      onError?.(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInitFetch) {
      handleFetch();
    }
  }, []);

  return { data, error, loading, handleFetch };
};

export default useFetch;
