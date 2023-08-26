import React from 'react';

interface Props {
  trailerKey: string;
  closeBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

const TrailerPlay = ({ trailerKey, closeBtn }: Props) => {
  return (
    <div
      id="trailer-wrap"
      className="fixed left-0 top-0 w-screen h-screen z-20 bg-[rgba(0,0,0,0.8)]"
      onClick={() => closeBtn((prev) => !prev)}
    >
      <div
        className="fixed w-[80vw] h-[90vh]"
        style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
      >
        <div className=" w-[80vw] h-[90vh] bg-black flex flex-col justify-between items-center">
          <div className="flex w-full h-[5vh] justify-between items-center">
            <p className="text-white pl-5">예고편</p>
            <button
              className="text-white pr-5"
              onClick={(e) => {
                e.stopPropagation();
                closeBtn((prev) => !prev);
              }}
            >
              x
            </button>
          </div>

          <iframe
            className="w-full h-[85vh] "
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=ko&modestbranding=1&fs=1&autohide=1`}
          />
        </div>
      </div>
    </div>
  );
};

export default TrailerPlay;
