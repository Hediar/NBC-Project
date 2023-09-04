'use client';

interface Props {
  children: React.ReactNode;
}
const Modal = ({ children }: Props) => {
  return (
    <div className="overflow-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md shadow-gray-200 z-50 bg-white max-w-screen-lg max-h-[90vh] box-border rounded-lg">
      {children}
    </div>
  );
};

export default Modal;
