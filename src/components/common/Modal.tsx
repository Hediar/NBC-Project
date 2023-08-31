'use client';

interface Props {
  children: React.ReactNode;
}
const Modal = ({ children }: Props) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md shadow-gray-400 z-50">
      {children}
    </div>
  );
};

export default Modal;
