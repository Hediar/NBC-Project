import Search from '@/components/common/Search';
import Sort from '@/components/contents/Sort';

const MovieListPage = () => {
  return (
    <div>
      MovieListPage
      <div className="flex justify-between">
        <Sort />
        <Search />
      </div>
    </div>
  );
};

export default MovieListPage;
