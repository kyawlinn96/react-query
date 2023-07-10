import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

export default function Portal({ children }: PortalProps) {
  /**
   * TODO: Create reusable container for popovers
   */

  return createPortal(children, document.body);
}
