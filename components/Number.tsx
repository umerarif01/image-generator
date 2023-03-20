import React from "react";

interface NumberProps {
  number: number;
  title: string;
}

const Number = ({ number, title }: NumberProps) => {
  return (
    <div className="flex mb-5 items-center space-x-3">
      <p className="bg-black text-white rounded-full py-1 px-3">{number}</p>
      <p className="text-left font-medium">{title}</p>
    </div>
  );
};

export default Number;
