import { useEffect } from 'react';
import noop from '../utilities/noop';

const useDismissable = ({ isOpen = true, dismissableRef, onDismiss }) => {
  useEffect(() => {
    if (!isOpen || !dismissableRef.current) {
      return noop;
    }
    const handleDocumentClick = (event) => {
      if (!dismissableRef.current.contains(event.target)) {
        onDismiss();
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isOpen, dismissableRef, onDismiss]);
};

export default useDismissable;
