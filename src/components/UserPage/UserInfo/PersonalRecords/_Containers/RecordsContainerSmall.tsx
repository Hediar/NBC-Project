import React from 'react';

type Props = {
  bgColor: string;
  title: string;
  value: string;
  borderColor: string;
  textColor: string;
};

const RecordsContainerSmall = ({ bgColor, title, value, borderColor, textColor }: Props) => {
  return (
    <div
      className={`w-full p-5 rounded-xl shadow1 animate-300`}
      style={{ backgroundColor: `${bgColor}`, border: `1px solid ${borderColor}` }}
    >
      <div className="w-full flex justify-between items-center h-[50px] px-3  ">
        <span className="subtitle2_suit ">{title}</span>
        <span className="pt-1 font-bold text-3xl 2xl:text-4xl" style={{ color: `${textColor}` }}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default RecordsContainerSmall;
