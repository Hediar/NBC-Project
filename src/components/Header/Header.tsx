import React from 'react';
import AuthButton from './_auth/AuthButtons';

const Header = () => {
  return (
    <div className="h-20 shadow-md shadow-gray-300 flex items-center px-4 justify-between bg-gray-500">
      <h1 className="text-white text-xl font-bold tracking-wider">무비바바</h1>
      <div className="flex gap-3">
        <AuthButton />
      </div>
    </div>
  );
};

export default Header;
