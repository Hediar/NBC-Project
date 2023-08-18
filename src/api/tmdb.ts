const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH}`
  }
};

export const getMovieDetail = async (id: string) => {
  try {
    const detailRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_URL}${id}?language=ko-KR`, options);
    const detailData = await detailRes.json();

    const trailerRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_URL}${id}/videos?language=ko-KR`, options);
    const trailerData = await trailerRes.json();

    const watchProviderRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_URL}${id}/watch/providers`, options);
    const watchProviderData = await watchProviderRes.json();

    const imageRes = await fetch(`${process.env.NEXT_PUBLIC_TMDB_BASE_URL}${id}/images`, options);
    const imageData = await imageRes.json();

    const trailerKeys = trailerData.results.map((result: TrailerData) => result.key);
    const watchProviders = watchProviderData.results['KR'];
    const backdropImages = imageData.backdrops;

    const movieDetailData = { ...detailData, trailerKeys, watchProviders, backdropImages };
    return movieDetailData;
  } catch (error) {
    console.error(error);
  }
};
