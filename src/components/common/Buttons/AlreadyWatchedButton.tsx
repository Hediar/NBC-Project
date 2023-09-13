'use client';

const AlreadyWatchedButton = ({ movieId, title }: { movieId: number; title: string }) => {
  const WatchedButtonHandler = async () => {};
  return (
    <>
      <button
        className="w-full bg-white opacity-30 hover:opacity-100 font-bold py-2 px-4 rounded-xl"
        onClick={WatchedButtonHandler}
      >
        이미 봤어요 🤓
      </button>
    </>
  );
};

export default AlreadyWatchedButton;
