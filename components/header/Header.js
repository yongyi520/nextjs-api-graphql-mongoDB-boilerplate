import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-center bg-white border-b border-gray-200 w-full fixed top-0 inset-x-0 h-20 shadow-sm">
      <div className="flex items-center justify-between md:w-4/5 md:px-0 sm:px-16 sm:w-full">
        <div className="flex w-1/4 items-center justify-start">BLOG</div>
        <div className="w-1/2"></div>
        <div className='flex items-center justify-end w-1/4'>
          <Link href="/"><a className="py-2 px-6">Home</a></Link>
          <Link href="/about"><a className="py-2 px-6">About</a></Link>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {};

export default Header;
