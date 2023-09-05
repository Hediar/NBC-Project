import React from 'react';

type Props = {
  bgColor: string;
  borderColor: string;
  title: string;
  children: React.ReactNode;
};

const RecordsContainerBig = ({ bgColor, borderColor, title, children }: Props) => {
  return (
    <div
      className={`flex-1 py-6 rounded-xl shadow1 relative`}
      style={{ backgroundColor: `${bgColor}`, border: `1px solid ${borderColor}` }}
    >
      <h2 className=" absolute left-6 top-6 subtitle2_suit ">{title}</h2>
      <div className="pl-10 flex justify-between items-center h-[350px] px-6 pt-10">{children}</div>
    </div>
  );
};

export default RecordsContainerBig;
{
  /* <MovieRuntimeGraph titles={titles} runtimes={runtimesHours} /> */
}
