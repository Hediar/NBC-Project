import { createPortal } from 'react-dom';

const Modal = ({ children }: { children: React.ReactNode }) => {
  return createPortal(
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md shadow-gray-400 z-50">
      {children}
    </div>,
    document.body
  );
};

export default Modal;
