'use client';

const AlreadyWatchedButton = ({ movieId, title }: { movieId: number; title: string }) => {
  const WatchedButtonHandler = async () => {};
  return (
    <>
      <button
        className="w-full bg-transparent sm:bg-white sm:opacity-30 hover:opacity-100 font-bold py-2 px-4 rounded-xl"
        onClick={WatchedButtonHandler}
      >
        이미 봤어요 🤓
      </button>
    </>
  );
};

export default AlreadyWatchedButton;
