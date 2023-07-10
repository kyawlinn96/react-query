import React from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
}
const Portal: React.FC<Props> = ({ children }) => {
  return createPortal(children, document.body);
};

export default Portal;
