import React from 'react';

const Spinner = () => {
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-indigo-600 font-semibold text-lg animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Spinner;