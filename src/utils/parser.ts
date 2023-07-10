import parse from 'html-react-parser';
import HTMLReactParser from 'react-html-parser';

export const Parser = (Description: string) => {
  return HTMLReactParser(parse(Description || ''));
};
