import supabase from '@/supabase/config';

const filterIgnoreMovies = async (username: string) => {
  // 1. 사용자 정보 조회
  const { data: userId } = await supabase.from('users').select('id').eq('username', username);
  const { data: ignoreList } = await supabase
    .from('ignored_movies')
    .select('ignored_movies')
    .eq('userid', userId![0]?.id);
  const { data: watched } = await supabase.from('users').select('watched_movies').eq('id', userId![0]?.id);

  // 2. ignoreList와 watched 목록에서 영화 ID 추출
  const ignoredMovieIds = ignoreList![0].ignored_movies || [];
  const watchedMovieIds = watched![0].watched_movies || [];
  console.log(ignoreList, watchedMovieIds);
  // 3. 필터링하여 제외된 영화들 반환
  const ignoredList = Array.from(new Set([...ignoredMovieIds, ...watchedMovieIds])).map((id) => id.toString());
  return ignoredList;
};

export default filterIgnoreMovies;
