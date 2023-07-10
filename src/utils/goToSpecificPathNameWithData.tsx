import { NavigateFunction } from 'react-router-dom';

type Data = Record<string, unknown>;

export function goToSpecificPathNameWithData(
  navigate: NavigateFunction,
  path_name: string,
  data: Data
): void {
  navigate(path_name, { state: data });
}
