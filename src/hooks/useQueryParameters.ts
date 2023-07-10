import { useSearchParams } from 'react-router-dom';

export default function useQueryParameters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setQuery = (key: string, value: any) => {
    setSearchParams({ [key]: value }, { replace: true });
  };

  function updateQuery(queryObject: Record<string, any>) {
    setSearchParams(
      { ...Object.fromEntries(searchParams), ...queryObject },
      {
        replace: true,
      }
    );
  }

  function deleteQuery(key: string) {
    searchParams.delete(key);
    setSearchParams({ ...Object.fromEntries(searchParams) }, { replace: true });
  }

  const deleteQueries = () => {
    setSearchParams('', { replace: true });
  };

  return {
    query: searchParams,
    setQuery,
    updateQuery,
    deleteQuery,
    deleteQueries,
  };
}
