import React from 'react';
import { NavigationMenuDemo } from './nav';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={`flex justify-between items-center h-16 px-4 shadow ${className}`}>
      <div className="pr-4">
        {/* <NavigationMenuDemo /> */}
      </div>
      <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r text-black flex-grow text-center">
        Chala
      </h1>
    </header>
  );
}

export default Header;
