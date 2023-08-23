import React, { useEffect, useRef } from 'react';

type Props = {
  trailerKey: string;
  closeBtn: React.Dispatch<React.SetStateAction<boolean>>;
};

const TrailerPlay = ({ trailerKey, closeBtn }: Props) => {
  return (
    <div
      className="w-[80vw] h-[90vh] z-10"
      style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
    >
      <div className="w-[80vw] h-[5vh] bg-black flex justify-between items-center">
        <p className="text-white pl-5">예고편</p>
        <button className="text-white pr-5" onClick={() => closeBtn((prev) => !prev)}>
          x
        </button>
      </div>
      <iframe
        className="w-[80vw] h-[85vh]"
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=ko&modestbranding=1&fs=1&autohide=1`}
      />
    </div>
  );
};

export default TrailerPlay;
