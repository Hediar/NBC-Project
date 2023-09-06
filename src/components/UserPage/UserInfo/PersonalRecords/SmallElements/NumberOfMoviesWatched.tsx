import RecordsContainerSmall from '../_Containers/RecordsContainerSmall';

const NumberOfMoviesWatched = ({ numberOfMoviesWatched }: { numberOfMoviesWatched: number }) => {
  return (
    <RecordsContainerSmall
      key="FAF0FF"
      bgColor="#FAF0FF"
      title="본 영화 개수"
      value={numberOfMoviesWatched.toString()}
      borderColor="#eed4fa"
      textColor="#c670f2"
    />
  );
};

export default NumberOfMoviesWatched;
