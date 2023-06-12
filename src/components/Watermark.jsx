import React from 'react';

const Watermark = ({ text }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50 z-50">
      <div className="text-red-500 text-xl -rotate-12 font-bold">{text}</div>
    </div>
  );
};

export default Watermark;
