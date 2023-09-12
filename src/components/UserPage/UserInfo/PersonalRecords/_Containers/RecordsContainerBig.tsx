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
      className={`w-full xl:w-1/3 2xl:w-1/3 py-6 rounded-xl shadow1 relative flex justify-center items-center animate-300 `}
      style={{ backgroundColor: `${bgColor}`, border: `1px solid ${borderColor}` }}
    >
      <h2 className="absolute left-6 top-6 subtitle2_suit ">{title}</h2>
      <div className="flex justify-center items-center h-[300px] pt-10 overflow-hidden">{children}</div>
    </div>
  );
};

export default RecordsContainerBig;
{
  /* <MovieRuntimeGraph titles={titles} runtimes={runtimesHours} /> */
}
