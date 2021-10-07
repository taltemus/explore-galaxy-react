import { useMemo } from 'react';
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router';
import queryString from 'querystring';

export function useRouter() {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const match = useRouteMatch();

  return useMemo(() => {
    return {
      // Commonly used functionality
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      // Get all query strings from search and combine them with params
      query: {
        ...queryString.parse(location.search),
        ...params,
      },
      // Expose the original items for other operations
      history,
      location,
      match,
    };
  }, [history, location, params, match]);
}
