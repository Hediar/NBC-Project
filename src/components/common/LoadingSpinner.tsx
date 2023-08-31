const LoadingSpinner = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]">
      <div className="animate-spin border-t-[2px] border-l-[3px] border-slate-500 w-8 h-8 rounded-full "></div>
    </div>
  );
};

export default LoadingSpinner;
