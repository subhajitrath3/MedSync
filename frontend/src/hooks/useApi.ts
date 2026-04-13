/**
 * React hooks for API calls
 * Custom hooks for making API requests with loading and error states
 */

import { useState, useEffect } from 'react';
import type { ApiResponse } from '../lib/api';

/**
 * Generic hook for API calls
 */
export function useApi<T>(
  apiFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction();
        
        if (isMounted) {
          setData(result);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.error || err.message || 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}

/**
 * Hook for API mutations (POST, PUT, DELETE)
 */
export function useApiMutation<T, P = any>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    apiFunction: (params: P) => Promise<T>,
    params: P
  ) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(params);
      setData(result);
      return result;
    } catch (err: any) {
      const errorMessage = err.error || err.message || 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return { mutate, data, loading, error, reset };
}

/**
 * Hook for paginated API calls
 */
export function usePaginatedApi<T>(
  apiFunction: (page: number, limit: number) => Promise<{ data: T[]; pagination: any }>,
  initialPage: number = 1,
  initialLimit: number = 10
) {
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction(page, limit);
        
        if (isMounted) {
          setData(result.data);
          setPagination(result.pagination);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.error || err.message || 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [page, limit]);

  const nextPage = () => {
    if (pagination && page < pagination.totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goToPage = (newPage: number) => {
    setPage(newPage);
  };

  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing limit
  };

  return {
    data,
    pagination,
    loading,
    error,
    page,
    limit,
    nextPage,
    prevPage,
    goToPage,
    changeLimit,
  };
}
