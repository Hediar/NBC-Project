import React from 'react';

const ReviewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="wrap">{children}</div>
    </>
  );
};

export default ReviewLayout;
