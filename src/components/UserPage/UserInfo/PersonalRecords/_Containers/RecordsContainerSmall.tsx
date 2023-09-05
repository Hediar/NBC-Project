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
      className={`flex-1 p-5 rounded-xl shadow1`}
      style={{ backgroundColor: `${bgColor}`, border: `1px solid ${borderColor}` }}
    >
      <div className="flex justify-between items-center h-[50px] px-6">
        <span className="subtitle2_suit">{title}</span>
        <span className="bold_40_suit" style={{ color: `${textColor}` }}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default RecordsContainerSmall;
